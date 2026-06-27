import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './css/Doc.css'
import Navbar from '../components/Navigation'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Documentation() {
    const containerRef = useRef(null);

    useEffect(() => {
        // 1. Smooth Scroll pada Link Navigasi
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: targetId, offsetY: 20 },
                    ease: "power2.inOut"
                });
            });
        });

        // 2. Highlight Navigasi Aktif berdasarkan Scroll
        const sections = document.querySelectorAll('section');
        sections.forEach((section) => {
            ScrollTrigger.create({
                trigger: section,
                start: "top center",
                end: "bottom center",
                onToggle: self => {
                    if (self.isActive) {
                        links.forEach(l => l.classList.remove('active'));
                        document.querySelector(`a[href="#${section.id}"]`)?.classList.add('active');
                    }
                }
            });
        });

        return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, []);

    return (
        <>
        <div className="nav">

            <Navbar />
        </div>
            <div className="documentation-container">
                <div className="side-navigation">
                    <div className="nav-brand">
                        <span className="nav-logo">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m480-400-80-80 80-80 80 80-80 80Zm-85-235L295-735l185-185 185 185-100 100-85-85-85 85ZM225-295 40-480l185-185 100 100-85 85 85 85-100 100Zm510 0L635-395l85-85-85-85 100-100 185 185-185 185ZM480-40 295-225l100-100 85 85 85-85 100 100L480-40Z" /></svg>
                        </span>
                        <span className="nav-title">API Docs</span>
                    </div>

                    <div className="nav-section">
                        <p className="nav-section-title">Getting Started</p>
                        <a href="#introduction" className="nav-link active">Introduction</a>
                        <a href="#authentication" className="nav-link">Authentication</a>
                        <a href="#quickstart" className="nav-link">Quickstart</a>
                        <a href="#errors" className="nav-link">Errors & Status Codes</a>
                    </div>

                    <div className="nav-section">
                        <p className="nav-section-title">Core Resources</p>
                        <a href="#users" className="nav-link">Users</a>
                        <a href="#products" className="nav-link">Products</a>
                        <a href="#orders" className="nav-link">Orders</a>
                        <a href="#payments" className="nav-link">Payments</a>
                        <a href="#webhooks" className="nav-link">Webhooks</a>
                    </div>

                    <div className="nav-section">
                        <p className="nav-section-title">Advanced</p>
                        <a href="#rate-limits" className="nav-link">Rate Limiting</a>
                        <a href="#pagination" className="nav-link">Pagination</a>
                        <a href="#filtering" className="nav-link">Filtering & Sorting</a>
                        <a href="#versioning" className="nav-link">Versioning</a>
                    </div>

                    <div className="nav-section">
                        <p className="nav-section-title">SDKs</p>
                        <a href="#sdk-js" className="nav-link">JavaScript</a>
                        <a href="#sdk-python" className="nav-link">Python</a>
                        <a href="#sdk-go" className="nav-link">Go</a>
                    </div>

                    <div className="nav-section">
                        <p className="nav-section-title">More Resources</p>
                        <a href="#changelog" className="nav-link">Changelog</a>
                        <a href="#migration" className="nav-link">Migration Guide</a>
                        <a href="#faq" className="nav-link">FAQ</a>
                        <a href="#support" className="nav-link">Support</a>
                        <a href="#status" className="nav-link">API Status</a>
                        <a href="#community" className="nav-link">Community</a>
                    </div>
                </div>

                <div className="documentation-space">
                    {[
                        'introduction', 'authentication', 'quickstart', 'errors',
                        'users', 'products', 'orders', 'payments', 'webhooks',
                        'rate-limits', 'pagination', 'filtering', 'versioning',
                        'sdk-js', 'sdk-python', 'sdk-go'
                    ].map((id) => (
                        <section key={id} id={id} style={{ minHeight: '50vh', color: '#fff', padding: '20px 0' }}>
                            <h2 style={{ textTransform: 'capitalize' }}>{id.replace('-', ' ')}</h2>
                            <p>Konten dokumentasi untuk {id} ada di sini.</p>
                        </section>
                    ))}
                </div>
            </div>
        </>
    )
}