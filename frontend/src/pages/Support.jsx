import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Support.css';

const faqs = [
    {
        q: 'Berapa lama proses penarikan dana?',
        a: 'Penarikan via e-wallet diproses instan. Untuk transfer ke bank lokal, dana akan masuk maksimal dalam 1 jam.',
    },
    {
        q: 'Kenapa Virtual Account saya expired?',
        a: 'Virtual Account memiliki masa aktif 24 jam sejak dibuat. Setelah lewat batas waktu, silakan generate VA baru melalui dashboard merchant kamu.',
    },
    {
        q: 'Berapa biaya admin untuk setiap transaksi?',
        a: 'Biaya admin untuk transaksi Virtual Account adalah Rp4.000 per transaksi. Tidak ada biaya tersembunyi lainnya.',
    },
    {
        q: 'Bagaimana cara menghubungi tim support?',
        a: 'Tim support kami siap membantu 24/7 melalui live chat di dashboard, email, atau form di bawah halaman ini.',
    },
];

export default function Support() {
    const [openIndex, setOpenIndex] = useState(null);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <div className="support-page">
            <div className="support-container">

                {/* Header */}
                <div className="support-header">
                    <span className="support-eyebrow">Pusat Bantuan</span>
                    <h1 className="support-title">Ada yang bisa kami bantu?</h1>
                    <p className="support-subtitle">
                        Cari jawaban cepat di FAQ, atau kirim pesan langsung ke tim support kami.
                    </p>
                </div>

                {/* Quick contact cards */}
                <div className="contact-grid">
                    <Link target='__blank' to="https://is-chat-six.vercel.app/" className="contact-card">
                        <div className="contact-icon">💬</div>
                        <h3>Live Chat</h3>
                        <p>Respon rata-rata di bawah 5 menit, tersedia 24/7.</p>
                    </Link>
                    <div className="contact-card">
                        <div className="contact-icon">✉️</div>
                        <h3>Email</h3>
                        <p>support@idelpay.com</p>
                    </div>
                    <div className="contact-card">
                        <div className="contact-icon">📞</div>
                        <h3>Telepon</h3>
                        <p>( belum tersedia )</p>
                    </div>
                </div>

                {/* FAQ */}
                <div className="faq-section">
                    <h2 className="section-title">Pertanyaan yang sering ditanyakan</h2>
                    <div className="faq-list">
                        {faqs.map((item, index) => (
                            <div
                                key={index}
                                className={`faq-item ${openIndex === index ? 'open' : ''}`}
                                onClick={() => toggleFaq(index)}
                            >
                                <div className="faq-question">
                                    <span>{item.q}</span>
                                    <span className="faq-toggle">{openIndex === index ? '−' : '+'}</span>
                                </div>
                                {openIndex === index && (
                                    <p className="faq-answer">{item.a}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact form */}
                <div className="form-section">
                    <h2 className="section-title">Kirim pesan ke kami</h2>

                    {sent ? (
                        <div className="success-box">
                            Pesan kamu sudah terkirim. Tim kami akan membalas secepatnya.
                        </div>
                    ) : (
                        <form className="support-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-field">
                                    <label>Nama</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Nama lengkap"
                                    />
                                </div>
                                <div className="form-field">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="nama@email.com"
                                    />
                                </div>
                            </div>
                            <div className="form-field">
                                <label>Pesan</label>
                                <textarea
                                    name="message"
                                    rows="5"
                                    required
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tulis pertanyaan atau kendala kamu di sini..."
                                />
                            </div>
                            <button type="submit" className="submit-btn">
                                Kirim Pesan
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}