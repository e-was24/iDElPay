import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import './css/dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  const [merchantData, setMerchantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [showProdKey, setShowProdKey] = useState(false);

  useEffect(() => {
    fetchMerchantProfile();
  }, []);
  const fetchMerchantProfile = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

      const response = await fetch(`${BACKEND_URL}/api/merchant/profile`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,// Mengirim token
          'Content-Type': 'application/json' 
        }
      });

      const result = await response.json();
      console.log("Data yg dikirim backend: ", result.data)
      if (result.success) {
        setMerchantData(result.data);
      }
    } catch (error) {
      setErrorMsg('Gagal memuat data dashboard.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm('Apakah kamu yakin ingin keluar?');
    if (!confirmLogout) return;

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      navigate('/login');
    } catch (error) {
      alert('Gagal logout: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <p>Memuat data dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      {/* NAVBAR */}
      <nav className="dashboard-navbar">
        <div>
          <h1 className="navbar-title">Merchant Portal</h1>
          <p className="navbar-email">{merchantData?.email}</p>
        </div>
        <button onClick={handleLogout} className="btn-logout">
          Keluar Akun
        </button>
      </nav>

      {/* ISI UTAMA */}
      <main className="dashboard-main">
        {errorMsg && <div className="error-message">{errorMsg}</div>}

        {/* Info Bisnis */}
        <div className="card">
          <h2 className="welcome-title">
            Selamat Datang, {merchantData?.business_name}!
          </h2>
          <p className="account-status">
            Status Akun:{' '}
            <span className={merchantData?.is_active ? 'status-active' : 'status-inactive'}>
              {merchantData?.is_active ? 'Aktif' : 'Nonaktif'}
            </span>
          </p>
        </div>

        {/* Kartu Keuangan */}
        <div className="card-grid">
          <div className="card">
            <p className="card-label">Total Saldo Bisnis</p>
            <p className="balance-amount">
              {merchantData?.currency}{' '}
              {Number(merchantData?.balance).toLocaleString('id-ID', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="card">
            <p className="card-label">Metode Penarikan</p>
            <p className="withdrawal-method">Manual / Atas Permintaan</p>
            <p className="card-note">Gunakan tombol penarikan saldo apabila fitur sudah tersedia.</p>
          </div>
        </div>

        {/* API Credentials */}
        <div className="card credentials-card">
          <h3 className="credentials-title">Kredensial Integrasi API</h3>

          <div className="credential-field">
            <label className="credential-label">API Key Sandbox</label>
            <input
              type="text"
              readOnly
              value={merchantData?.api_key_sandbox || 'ERROR 500'}
              className="credential-input"
            />
          </div>

          <div className="credential-field">
            <label className="credential-label">API Key Production</label>
            <div className="credential-input-group">
              <input
                type={showProdKey ? 'text' : 'password'}
                readOnly
                value={merchantData?.api_key_production || 'ERROR 500'}
                className="credential-input"
              />
              <button
                type="button"
                className="btn-toggle-visibility"
                onClick={() => setShowProdKey((v) => !v)}
              >
                {showProdKey ? 'Sembunyikan' : 'Tampilkan'}
              </button>
            </div>
            <p className="warning-text">⚠️ Jangan pernah membagikan API Key Production kepada siapapun.</p>
          </div>

          <div className="credential-field">
            <label className="credential-label">Webhook Endpoint URL</label>
            <input
              type="text"
              readOnly
              value={merchantData?.webhook_url || 'Belum diatur'}
              className="credential-input credential-input-muted"
            />
          </div>
        </div>
      </main>
    </div>
  );
}