import React from 'react';
import './css/Community.css';

const channels = [
    {
        icon: '💬',
        name: 'Discord',
        desc: 'Diskusi langsung dengan merchant lain dan tim kami.',
        members: '8.200+ anggota',
        link: '#',
        cta: 'Gabung Discord',
    },
    {
        icon: '📢',
        name: 'Telegram',
        desc: 'Update terbaru, pengumuman, dan info maintenance.',
        members: '12.500+ anggota',
        link: '#',
        cta: 'Gabung Telegram',
    },
    {
        icon: '📘',
        name: 'Facebook Group',
        desc: 'Tempat berbagi tips dan pengalaman antar merchant.',
        members: '5.400+ anggota',
        link: '#',
        cta: 'Gabung Grup',
    },
];

const highlights = [
    {
        title: 'Forum Diskusi',
        desc: 'Tanya jawab seputar integrasi, pembayaran, dan kendala teknis langsung dengan komunitas.',
    },
    {
        title: 'Cerita Merchant',
        desc: 'Kisah nyata dari merchant yang berkembang menggunakan platform kami.',
    },
    {
        title: 'Webinar & Event',
        desc: 'Sesi belajar rutin tentang optimasi pembayaran dan pertumbuhan bisnis online.',
    },
    {
        title: 'Program Referral',
        desc: 'Ajak merchant lain bergabung dan dapatkan keuntungan tambahan dari setiap referensi.',
    },
];

const stories = [
    {
        name: 'Rina, Toko Online Fashion',
        quote: 'Sejak pakai Virtual Account, pelanggan jadi lebih percaya karena prosesnya jelas dan cepat.',
    },
    {
        name: 'Doni, Pemilik Warung Digital',
        quote: 'Komunitasnya aktif banget, tiap ada kendala selalu cepat dibantu sama member lain.',
    },
    {
        name: 'Lestari, Reseller Kosmetik',
        quote: 'Webinar dari tim mereka bener-bener membantu aku ngerti cara optimasi pembayaran.',
    },
];

export default function Community() {
    return (
        <div className="community-page">
            <div className="community-container">

                {/* Hero */}
                <div className="community-hero">
                    <span className="community-eyebrow">Komunitas</span>
                    <h1 className="community-title">
                        Tumbuh bersama ribuan merchant lainnya
                    </h1>
                    <p className="community-subtitle">
                        Tempat berbagi cerita, bertanya, dan belajar dari sesama pelaku
                        bisnis yang juga menggunakan platform kami setiap hari.
                    </p>
                </div>

                {/* Channels */}
                <div className="channels-grid">
                    {channels.map((c, i) => (
                        <div className="channel-card" key={i}>
                            <div className="channel-icon">{c.icon}</div>
                            <h3>{c.name}</h3>
                            <p className="channel-desc">{c.desc}</p>
                            <span className="channel-members">{c.members}</span>
                            <a href={c.link} className="channel-btn" target="_blank" rel="noopener noreferrer">
                                {c.cta}
                            </a>
                        </div>
                    ))}
                </div>

                {/* Highlights */}
                <div className="highlights-section">
                    <h2 className="section-title">Apa yang Bisa Kamu Dapatkan</h2>
                    <div className="highlights-grid">
                        {highlights.map((h, i) => (
                            <div className="highlight-card" key={i}>
                                <h3>{h.title}</h3>
                                <p>{h.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stories */}
                <div className="stories-section">
                    <h2 className="section-title">Cerita dari Komunitas</h2>
                    <div className="stories-grid">
                        {stories.map((s, i) => (
                            <div className="story-card" key={i}>
                                <p className="story-quote">&ldquo;{s.quote}&rdquo;</p>
                                <span className="story-name">{s.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="community-cta">
                    <h2>Belum jadi bagian dari komunitas?</h2>
                    <p>Gabung sekarang dan mulai diskusi dengan ribuan merchant lainnya.</p>
                    <a href="#" className="cta-btn">Gabung Komunitas</a>
                </div>
            </div>
        </div>
    );
}