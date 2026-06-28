import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import './css/Form.css';

export default function Register() {
    const navigate = useNavigate();

    const [businessName, setBusinessName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const generateRandomHex = (length) => {
        const array = new Uint8Array(length);
        crypto.getRandomValues(array);
        return Array.from(array, (b) => b.toString(16).padStart(2, '0'))
            .join('')
            .slice(0, length);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        business_name: businessName,
                    },
                },
            });

            if (authError) throw authError;

            const userId = authData?.user?.id;

            if (!userId) {
                throw new Error('Registration failed. Please try again.');
            }

            const rawSandbox = `sbx_${generateRandomHex(32)}`;
            const rawProduction = `prod_${generateRandomHex(32)}`;

            const { error: dbError } = await supabase.rpc('insert_encrypted_merchant', {
                p_id: String(userId),
                p_business_name: String(businessName),
                p_email: String(email),
                p_raw_sandbox: String(rawSandbox),
                p_raw_production: String(rawProduction),
            });

            if (dbError) {
                throw new Error('Failed to create business profile. Please try again later.');
            }

            setShowModal(true);
        } catch (error) {
            const msg =
                typeof error?.message === 'string'
                    ? error.message
                    : 'An error occurred. Please try again.';

            setErrorMsg(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="register-container">
                <div className="register-card">
                    <div className="register-header">
                        <h2 className="title">Register a Merchant Account</h2>
                        <p className="subtitle">Start managing your business payments now.</p>
                    </div>

                    {errorMsg && <div className="error-message">{errorMsg}</div>}

                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className="icon"></div>
                        <div className="form-group-wrapper">
                            <div className="form-group">
                                <label className="input-label">Nama Bisnis</label>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        required
                                        value={businessName}
                                        onChange={(e) => setBusinessName(e.target.value)}
                                        className="input-field"
                                        placeholder="Contoh: PT Maju Jaya"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="input-label">Email Bisnis</label>
                                <div className="input-wrapper">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input-field"
                                        placeholder="nama@bisnis.com"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="input-label">Password</label>
                                <div className="input-wrapper">
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="input-field"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button type="submit" disabled={loading} className="submit-button">
                                {loading ? <p>Loading...</p> : <>Sign up</>}
                            </button>
                        </div>
                    </form>

                    <div className="login-link-container">
                        Already have an account?{' '}
                        <Link to="/login" className="login-link">Login here</Link>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-head">
                            <h2>Registration Successful!</h2>
                            <p>Please check your email for account confirmation.</p>
                        </div>
                        <a
                            href="https://mail.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-gmail"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                            </svg>
                            Email Confirmation
                        </a>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowModal(false);
                                navigate('/login');
                            }}
                            className="btn-later"
                        >
                            Later
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}