import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient'; // Sesuaikan path file koneksi Supabase kamu

export default function Login() {
    const navigate = useNavigate();

    // State untuk menangkap form input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false)

    // State untuk status loading dan error
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            // Melakukan autentikasi menggunakan email & password ke Supabase Auth
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) throw error;

            // Jika berhasil masuk, arahkan ke halaman Dashboard utama merchant
            alert('Login berhasil! Selamat datang kembali.');
            navigate('/dashboard');

        } catch (error) {
            setErrorMsg(setShowModal(true) || 'Email atau password salah.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Masuk ke Merchant Portal
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Kelola transaksi dan pantau performa bisnismu
                    </p>
                </div>

                {/* Kotak Pesan Error */}
                {errorMsg && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-200">
                        {errorMsg}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm space-y-4">

                        {/* Input Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Bisnis</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="nama@bisnis.com"
                            />
                        </div>

                        {/* Input Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {/* Tombol Kirim / Submit */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {loading ? 'Menghubungkan...' : 'Masuk Sekarang'}
                        </button>
                    </div>
                </form>

                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-head">
                                <h2>Login failed</h2>
                                <p>Please confirm your email.</p>
                            </div>
                            <a
                                href="https://mail.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-gmail"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
                                Email Confirmation
                            </a>
                        </div>
                    </div>
                )}

                <div className="text-center text-sm text-gray-600 mt-4">
                    Belum memiliki akun merchant?{' '}
                    <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                        Daftar di sini
                    </Link>
                </div>
            </div>
        </div>
    );
}
