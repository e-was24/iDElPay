import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import './css/Dashboard.css';

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
    try {
      setLoading(true);

      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      if (!session) {
        navigate('/login');
        return;
      }

      const { data, error: dbError } = await supabase
        .from('merchant_profiles_secure')
        .select('*')
        .single();

      if (dbError) throw dbError;

      setMerchantData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error.message);
      setErrorMsg('Gagal memuat data dashboard.');
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
              value={merchantData?.api_key_sandbox || ''}
              className="credential-input"
            />
          </div>

          <div className="credential-field">
            <label className="credential-label">API Key Production</label>
            <div className="credential-input-group">
              <input
                type={showProdKey ? 'text' : 'password'}
                readOnly
                value={merchantData?.api_key_production || ''}
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