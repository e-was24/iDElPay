import React from 'react';
import { Link } from 'react-router-dom';
import './css/SuccessPopup.css';

/**
 * Popup sukses yang bisa dipakai ulang.
 *
 * Contoh pakai:
 * <SuccessPopup
 *   title="Login Berhasil"
 *   message="Selamat datang kembali. Kamu akan diarahkan ke dashboard."
 *   buttonLabel="Masuk ke Dashboard"
 *   to="/dashboard"
 * />
 *
 * Kalau mau pakai button (bukan Link), kirim onConfirm sebagai pengganti `to`:
 * <SuccessPopup
 *   title="Transaksi Berhasil"
 *   message="Dana sudah masuk ke saldo kamu."
 *   buttonLabel="Tutup"
 *   onConfirm={() => setShowPopup(false)}
 * />
 *
 * Tambahkan onClose untuk tombol X di pojok kanan atas (opsional).
 */
export default function SuccessPopup({
    title = 'Berhasil',
    message = '',
    buttonLabel = 'Lanjutkan',
    to = null,
    onConfirm = null,
    onClose = null,
}) {
    return (
        <div className="popup-overlay">
            <div className="popup-success">
                {onClose && (
                    <button className="popup-close" onClick={onClose} aria-label="Tutup">
                        ×
                    </button>
                )}

                <div className="popup-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="none"
                        stroke="#16171d"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>

                <h3 className="popup-title">{title}</h3>
                {message && <p className="popup-subtitle">{message}</p>}

                {to ? (
                    <Link to={to} className="popup-btn">
                        {buttonLabel}
                    </Link>
                ) : (
                    <button className="popup-btn" onClick={onConfirm}>
                        {buttonLabel}
                    </button>
                )}
            </div>
        </div>
    );
}