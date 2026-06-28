import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient'; // Sesuaikan path file koneksi Supabase kamu
import SuccessPopup from '../components/Successpopup';

export default function Login() {
    const navigate = useNavigate();

    // State untuk menangkap form input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false)
    const [loginSuccess, setLoginSuccess] = useState(false)

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
            // alert('Login berhasil! Selamat datang kembali.');
            setLoginSuccess(true);

        } catch (error) {
            setErrorMsg(setShowModal(true) || 'Email atau password salah.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loginSuccess && (
                <SuccessPopup
                    title="Login Berhasil"
                    message="Selamat datang kembali. Kamu akan diarahkan ke dashboard."
                    buttonLabel="Masuk ke Dashboard"
                    to="/dashboard"
                />
            )}
            <div className="login-page">
                <div className="login-card">
                    <div className="icon"></div>
                    <div>
                        <h2 className="login-title">
                            Login to the Merchant Portal
                        </h2>
                        <p className="login-subtitle">
                            Manage transactions and monitor your business performance.
                        </p>
                    </div>

                    {/* Kotak Pesan Error */}
                    {errorMsg && (
                        <div className="error-box">
                            {errorMsg}
                        </div>
                    )}

                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="input-group">

                            {/* Input Email */}
                            <div>
                                <label className="input-label">Business Email :</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="text-input"
                                    placeholder="nama@bisnis.com"
                                />
                            </div>

                            {/* Input Password */}
                            <div>
                                <label className="input-label">Password :</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="text-input"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Tombol Kirim / Submit */}
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="submit-btn"
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

                    <div className="register-text">
                        Don't have a merchant account yet?{' '}
                        <Link to="/register" className="register-link">
                            Sign up here
                        </Link>
                    </div>
                </div>
            </div >
        </>
    );
}
