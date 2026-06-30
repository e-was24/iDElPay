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

function hashKey(key) {
    return crypto.createHash('sha256').update(key).digest('hex');
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
        // 1. Buat user via Supabase Auth (admin, skip email confirm step kalau mau)
        const { data: authData, error: authError } =
            await supabaseAdmin.auth.admin.createUser({
                email,
                password,
                email_confirm: false, // user tetap akan terima email konfirmasi
                user_metadata: { business_name: businessName },
            });

        if (authError) {
            return res.status(400).json({ success: false, message: authError.message });
        }

        const userId = authData.user.id;

        // 2. Generate raw API keys
        const rawSandbox = generateKey('sbx');
        const rawProduction = generateKey('prod');

        // 3. Hash sebelum disimpan
        const sandboxKeyHash = hashKey(rawSandbox);
        const productionKeyHash = hashKey(rawProduction);

        // 4. Simpan ke tabel merchants (HASH saja, bukan raw key)
        const { error: dbError } = await supabaseAdmin.from('merchants').insert({
            id: userId,
            business_name: businessName,
            email,
            sandbox_key_hash: sandboxKeyHash,
            production_key_hash: productionKeyHash,
        });

        if (dbError) {
            // rollback: hapus user auth kalau insert merchant gagal
            await supabaseAdmin.auth.admin.deleteUser(userId);
            return res.status(400).json({
                success: false,
                message: 'Gagal membuat business profile. Silakan coba lagi.',
            });
        }

        // 5. Kirim raw key SEKALI saja ke frontend
        return res.json({
            success: true,
            sandboxKey: rawSandbox,
            productionKey: rawProduction,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
        });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));