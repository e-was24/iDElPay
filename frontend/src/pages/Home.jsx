import './css/home.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, IconBook } from '../components/Icons'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import { supabase } from '../lib/supabaseClient'

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const [products, setproducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef()

    const text = [
        {
            indonesian: "iDElPay adalah payment gateway ideal yang dirancang untuk bisnis modern. Kami mengubah transaksi kompleks menjadi pengalaman yang mulus, aman, dan instan bagi pelanggan Anda."
        },
        {
            english: "iDElPay is the ideal payment gateway designed for modern businesses. We transform complex transactions into seamless, secure, and instant experiences for your customers."
        },
        {
            CTA: "Simple, fast, and secure payment integration for your growing business."
        }
    ]

    const whyChooseiDElPay = [
        {
            svg: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5DF8D8"><path d="M420-360h120l-23-129q20-10 31.5-29t11.5-42q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 23 11.5 42t31.5 29l-23 129Zm60 280q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z" /></svg>,
            title: "Ironclad Security",
            description: "We employ enterprise-grade encryption to ensure every transaction is protected from unauthorized access."
        },
        {
            svg: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#53629E"><path d="m480-400-80-80 80-80 80 80-80 80Zm-85-235L295-735l185-185 185 185-100 100-85-85-85 85ZM225-295 40-480l185-185 100 100-85 85 85 85-100 100Zm510 0L635-395l85-85-85-85 100-100 185 185-185 185ZM480-40 295-225l100-100 85 85 85-85 100 100L480-40Z" /></svg>,
            title: "Seamless Integration",
            description: "Designed with developers in mind. Integrate our robust API into your website in minutes, not days."
        },
        {
            svg: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFBF00"><path d="M360-340h240v-60H360v60Zm-20-280q-32 0-59.5 18T235-556l50 33q10-15 24-25.5t31-10.5q17 0 31 10.5t24 24.5l50-33q-18-27-45.5-45T340-620Zm280 0q-32 0-59.5 18T515-556l50 33q10-14 24-24.5t31-10.5q17 0 31.5 10t23.5 25l50-33q-18-28-45.5-46T620-620ZM324-111.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM480-480Zm227 227q93-93 93-227t-93-227q-93-93-227-93t-227 93q-93 93-93 227t93 227q93 93 227 93t227-93Z" /></svg>,
            title: "Ideal User Experience",
            description: "A frictionless checkout process that turns visitors into loyal customers, boosting your conversion rates."
        },
        {
            svg: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F13E93"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" /></svg>,
            title: "24/7 Reliability",
            description: "Our infrastructure is built to scale, ensuring your business stays operational whenever your customers need to pay."
        }
    ];


    useGSAP(() => {

        gsap.from('.left-section', {
            opacity: 0,
            x: -20,
            duration: 1.5,
            stagger: 0.2,
            ease: "power2.out",
        })
        gsap.from('.icon', {
            opacity: 0,
            y: -20,
            duration: 2,
            delay: .7,
            ease: 'power2.in'
        })
        gsap.from('.CTA', {
            opacity: 0,
            duration: 1.5,
            delay: 1
        })
        gsap.from('.option-button', {
            opacity: 0,
            duration: 2,
            delay: 1.2
        })
        gsap.from('.right-section', {
            opacity: 0,
            x: 20,
            delay: .5,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
        })

        gsap.from('.payment-account-card', {
            x: '-65vh',
            duration: .5,
            delay: 1,
            ease: "power1.in",
            scale: 1.5
        })

        gsap.from('.why-title', {
            opacity: 0,
            y: -100,
            duration: 2,
            scrollTrigger: {
                trigger: ".why-header",
                start: "top 70%",
                end: "top 30%",
                toggleActions: "play none none reverse", // play, pause, resume, reverse
                // markers: true,
            }
        })
        gsap.from('.feature-section-container .feature-card', {
            opacity: 0,
            y: 50,
            stagger: 0.4,
            scrollTrigger: {
                trigger: ".feature-section-container .feature-card",
                start: "top 70%",
                end: "top 30%",
                scrub: 1,
                toggleActions: "play none none reverse", // play, pause, resume, reverse
                // markers: true,
            }
        })
    }, { scope: containerRef })

    useGSAP(() => {
        if (loading || products.length === 0) return; // jaga-jaga biar gak jalan saat masih kosong

        const cards = containerRef.current.querySelectorAll('.products-container .products-card');
        if (!cards.length) return;

        gsap.set(cards, { opacity: 0, y: -50 });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        gsap.to(entry.target, {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power2.out"
                        });
                        observer.unobserve(entry.target); // cukup sekali per card
                    }
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
        );

        cards.forEach((card, i) => {
            // stagger manual karena IntersectionObserver gak punya stagger built-in
            const originalCallback = observer;
            observer.observe(card);
        });

        return () => {
            observer.disconnect();
        };
    }, { scope: containerRef, dependencies: [products, loading] })

    // data fatching
    useEffect(() => {
        async function fetchProducts() {
            const { data, error } = await supabase
                .from('gateway_information')
                .select('*')
                .order('transaction_fee_flat', { ascending: true })
            if (error) {
                console.error('Error fetching data: ', error.message);
            } else {
                setproducts(data);
            }
            setLoading(false);
        }
        fetchProducts()
    }, []);



    return (
        <div ref={containerRef} className="home-cover">
            <div className="hero-section">
                <div className="left-section">
                    <div className="infor-section">
                        <div className="icon"></div>
                        {text.map((item, index) => (
                            <p key={index} className="CTA">{item.english}</p>
                        ))}
                    </div>
                    <div className="option-button">
                        <Link to="#" className="btn btn-start">Get Started <ArrowRight /></Link>
                        <Link to="/documentation" className="btn btn-open-document"><IconBook /> API Documentation</Link>
                    </div>
                </div>
                <div className="right-section">
                    <div className="payment-account-card">
                        <div className="header">
                            <span className="icon-scure"><div className='sub-icon'></div></span>
                            <div className="status-cover">
                                <p className="status">active status</p>
                            </div>
                        </div>
                        <div className="lazy">
                            <div className="long-lazy"></div>
                            <div className="short-lazy"></div>
                        </div>
                        <div className="bottom">
                            <div className="user-icon-count">
                                <div className="count">
                                    <div className="circle circle-1"></div>
                                    <div className="circle circle-2"></div>
                                    <div className="circle circle-3">100+</div>
                                </div>
                            </div>
                            <p className="card-bottom-infor">
                                active user
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-section">
                <div className="why-section">
                    <div className="why-header">
                        <h1 className='why-title'>Why choose <div className='sub-icon'></div> ?</h1>
                        <p className="why-p">Built for Growth, Secured for Trust.</p>
                    </div>
                    <div className="feature-section-container">
                        {whyChooseiDElPay.map((item, index) => (
                            <div className="feature-card" key={index}>
                                <span className="simbols">{item.svg}</span>
                                <h2 className="sub-title">{item.title}</h2>
                                <p className="deskription">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="withdrawal-section">
                    <div className="withdrawal-header">
                        <h2 className="withdrawal-title">Transparent withdrawal fees</h2>
                        <p>Keep more of your revenue with our low-fee payout solutions.</p>
                    </div>
                    {loading ? (
                        'Loading...'
                    ) : (
                        <div className="products-container">
                            {products.filter(item => item.is_active).map((item) => {
                                // Pengaman jika description dari database perlu di-parse ke Array
                                const features = Array.isArray(item.description)
                                    ? item.description
                                    : JSON.parse(item.description || "[]");

                                return (
                                    <div className="products-card" key={item.id}>

                                        {/* Nama Paket */}
                                        <h2 className="title-plans" style={{ fontSize: '1.5rem', color: '#5DF8D8', marginBottom: '8px', padding: '20px 0' }}>
                                            {item.name}
                                        </h2>

                                        {/* Tampilan Harga/Biaya Utama (Membaca dari transaction_fee_flat) */}
                                        <div className="price-section" style={{ marginBottom: '16px' }}>
                                            <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ffffff' }}>
                                                IDR {Number(item.transaction_fee_flat).toLocaleString('id-ID')}
                                            </span>
                                            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                                                {" "}/ transaction
                                            </span>
                                        </div>
                                        <div className="price-section-secondary" style={{ marginBottom: '16px', opacity: .6 }}>
                                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff' }}>
                                                US$ {Number(item.transaction_fee_flat_usd).toLocaleString('id-ID')}
                                            </span>
                                            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                                                {" "}/ transaction
                                            </span>
                                        </div>

                                        <hr style={{ borderColor: '#ffffff6d', marginBottom: '16px' }} />

                                        <ul className="plan-features" style={{ listStyle: 'none', textAlign: 'left' }}>
                                            {features.map((feature, idx) => (
                                                <li key={idx} style={{ color: '#ffffff', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
                                                    <span style={{ color: '#5DF8D8', fontWeight: 'bold' }}>✓</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <button className="plans-btn">
                                            Select a plan
                                        </button>

                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                <div className="last-hook">
                    <div className="last-hook-cover">
                        <span className="last-hook-label">iDElPay Payment Gateway</span>
                        <h2 className="last-hook-title">
                            Start Your Journey with <span className="highlight">iDElPay</span>
                        </h2>
                        <p className="last-hook-desc">
                            Boost trust and seamless transactions for your business with a payment
                            gateway that's secure, fast, and fully integrated for all your digital needs.
                        </p>
                        <div className="last-hook-actions">
                            <Link to="#" className="btn-primary">Join Now</Link>
                            <Link to="/documentation" className="btn-secondary">API Documentation</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}