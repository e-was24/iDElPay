import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { supabaseAdmin } from './lib/supabaseAdmin.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    })
);

// ---------- Helpers ----------
function generateKey(prefix) {
    return `${prefix}_${crypto.randomBytes(32).toString('hex')}`;
}

// ---------- Routes ----------
app.post('/api/register', async (req, res) => {
    const { businessName, email, password } = req.body;

    if (!businessName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'businessName, email, dan password wajib diisi.',
        });
    }

    try {
        const { data: authData, error: authError } =
            await supabaseAdmin.auth.admin.createUser({
                email,
                password,
                email_confirm: false,
                user_metadata: { business_name: businessName },
            });

        if (authError) {
            return res.status(400).json({ success: false, message: authError.message });
        }

        const userId = authData.user.id;

        const rawSandbox = generateKey('sbx');
        const rawProduction = generateKey('prod');

        const encryptionKey = process.env.ENCRYPTION_KEY;
        const { error: dbError } = await supabaseAdmin.rpc('insert_encrypted_merchant', {
            p_id: userId,
            p_business_name: businessName,
            p_email: email,
            p_raw_sandbox: rawSandbox,
            p_raw_production: rawProduction,
            p_key: encryptionKey,
        });

        if (dbError) {
            console.error('[register] DB insert error:', dbError.message);
            await supabaseAdmin.auth.admin.deleteUser(userId);
            return res.status(400).json({
                success: false,
                message: 'Gagal membuat business profile. Silakan coba lagi.',
            });
        }

        return res.json({
            success: true,
            sandboxKey: rawSandbox,
            productionKey: rawProduction,
        });
    } catch (err) {
        console.error('[register] Unexpected error:', err.message);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
        });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`[server] Backend running on port ${PORT}`));