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
                        <div className="contact-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 16">
                                <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                            </svg>
                        </div>
                        <h3>Live Chat</h3>
                        <p>Respon rata-rata di bawah 5 menit, tersedia 24/7.</p>
                    </Link>
                    <div className="contact-card">
                        <div className="contact-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-envelope-at" viewBox="0 0 16 16">
                                <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
                                <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                            </svg>
                        </div>
                        <h3>Email</h3>
                        <p>support@idelpay.com</p>
                    </div>
                    <div className="contact-card">
                        <div className="contact-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-telephone-inbound" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 0 .708L11.707 5H14.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v2.793L15.146.146a.5.5 0 0 1 .708 0m-12.2 1.182a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                            </svg>
                        </div>
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