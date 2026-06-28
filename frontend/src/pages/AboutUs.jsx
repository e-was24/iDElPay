import React from 'react';
import './css/AboutUs.css';

const stats = [
    { value: '2026', label: 'Tahun Berdiri' },
    { value: '100+', label: 'Merchant Aktif' },
    { value: '99.9%', label: 'Uptime Sistem' },
    { value: '24/7', label: 'Dukungan Layanan' },
];

const values = [
    {
        title: 'Cepat & Andal',
        desc: 'Setiap transaksi diproses real-time dengan infrastruktur yang dibangun untuk skala besar.',
    },
    {
        title: 'Transparan',
        desc: 'Tidak ada biaya tersembunyi. Semua fee ditampilkan jelas sebelum transaksi dikonfirmasi.',
    },
    {
        title: 'Aman',
        desc: 'Setiap dana dilindungi dengan enkripsi standar industri dan verifikasi berlapis.',
    },
    {
        title: 'Selalu Berkembang',
        desc: 'Kami terus menambah metode pembayaran baru sesuai kebutuhan bisnis kamu.',
    },
];

const team = [
    { name: 'Elan Satria A.W.', role: 'Product & Technology' },
    { name: 'Dimas Aji P.', role: 'Business & Operations' }
];

export default function AboutUs() {
    return (
        <div className="about-page">
            <div className="about-container">

                {/* Hero */}
                <div className="about-hero">
                    <span className="about-eyebrow">Tentang Kami</span>
                    <h1 className="about-title">
                        Membangun infrastruktur pembayaran<br />untuk bisnis Indonesia
                    </h1>
                    <p className="about-subtitle">
                        Kami membantu ribuan merchant menerima pembayaran dengan mudah,
                        cepat, dan aman — dari e-wallet hingga Virtual Account bank lokal.
                    </p>
                </div>

                {/* Stats */}
                <div className="stats-grid">
                    {stats.map((stat, i) => (
                        <div className="stat-card" key={i}>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Story */}
                <div className="story-section">
                    <h2 className="section-title">Cerita Kami</h2>
                    <p className="story-text">
                        Kami memulai perjalanan ini karena melihat banyak bisnis kecil
                        kesulitan menerima pembayaran digital secara efisien. Proses yang
                        rumit, biaya yang tidak transparan, dan dukungan yang lambat membuat
                        banyak merchant kehilangan peluang.
                    </p>
                    <p className="story-text">
                        Dari situ, kami membangun platform yang menggabungkan berbagai
                        metode pembayaran — e-wallet hingga Virtual Account bank lokal —
                        dalam satu sistem yang sederhana dan dapat diandalkan, didukung
                        tim support yang siap membantu kapan saja.
                    </p>
                </div>

                {/* Values */}
                <div className="values-section">
                    <h2 className="section-title">Nilai yang Kami Pegang</h2>
                    <div className="values-grid">
                        {values.map((item, i) => (
                            <div className="value-card" key={i}>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team */}
                <div className="team-section">
                    <h2 className="section-title">Tim Kami</h2>
                    <div className="team-grid">
                        {team.map((member, i) => (
                            <div className="team-card" key={i}>
                                <div className="team-avatar">
                                    {member.name.split(' ').map((n) => n[0]).join('')}
                                </div>
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="about-cta">
                    <h2>Siap bergabung dengan ribuan merchant lainnya?</h2>
                    <a href="/register" className="cta-btn">Daftar Sekarang</a>
                </div>
            </div>
        </div>
    );
}