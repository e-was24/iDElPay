import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { supabaseAdmin } from './lib/supabaseAdmin.js';

dotenv.config();

const allowedOrigins = [
    'https://pg-idelpay.vercel.app',
    'http://localhost:5173',
    process.env.FRONTEND_URL
];

const app = express();
app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// ---------- Helpers ----------
function generateKey(prefix) {
    return `${prefix}_${crypto.randomBytes(32).toString('hex')}`;
}

// ---------- Middleware ----------
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) return res.status(401).json({ success: false, message: 'Token tidak ditemukan.' });

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !user) return res.status(401).json({ success: false, message: 'Token tidak valid.' });

    req.user = user;
    next();
};

// ---------- Health check (buat debug cepat) ----------
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'Backend is alive', env: process.env.NODE_ENV || 'unset' });
});

// ---------- Routes ----------

// 1. Register (Public)
app.post('/api/register', async (req, res) => {
    const { businessName, email, password } = req.body;
    if (!businessName || !email || !password) {
        return res.status(400).json({ success: false, message: 'Data tidak lengkap.' });
    }

    try {
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email, password, email_confirm: true, user_metadata: { business_name: businessName }
        });

        if (authError) return res.status(400).json({ success: false, message: authError.message });

        const rawSandbox = generateKey('sbx');
        const rawProduction = generateKey('prod');

        const { error: dbError } = await supabaseAdmin.rpc('insert_encrypted_merchant', {
            p_id: authData.user.id,
            p_business_name: businessName,
            p_email: email,
            p_raw_sandbox: rawSandbox,
            p_raw_production: rawProduction,
            p_key: process.env.ENCRYPTION_KEY
        });

        if (dbError) {
            await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
            return res.status(500).json({ success: false, message: 'Gagal membuat profil bisnis.' });
        }

        return res.json({ success: true, sandboxKey: rawSandbox, productionKey: rawProduction });
    } catch (err) {
        console.error('[register] error:', err);
        return res.status(500).json({ success: false, message: 'Terjadi kesalahan server.' });
    }
});

// 2. Get Profile (Protected)
app.get('/api/merchant/profile', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const { data: profile, error: profileError } = await supabaseAdmin
            .from('merchants')
            .select('business_name, balance, email, phone_number, bank_name, bank_account_number')
            .eq('id', userId)
            .single();

        const { data: keys, error: keysError } = await supabaseAdmin.rpc('get_decrypted_keys', {
            p_id: userId,
            p_key: process.env.ENCRYPTION_KEY
        });

        if (profileError || keysError || !keys || keys.length === 0) {
            return res.status(404).json({ success: false, message: 'Data merchant tidak lengkap.' });
        }

        res.json({
            success: true,
            data: {
                ...profile,
                api_key_sandbox: keys[0].api_key_sandbox,
                api_key_production: keys[0].api_key_production
            }
        });
    } catch (err) {
        console.error('[merchant/profile] error:', err);
        res.status(500).json({ success: false, message: 'Server error saat menggabungkan data.' });
    }
});

// ---------- Local dev only ----------
// Vercel tidak butuh app.listen(), tapi local dev butuh ini supaya server tetap nyala.
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`[server] Backend running on port ${PORT}`));
}

export default app;