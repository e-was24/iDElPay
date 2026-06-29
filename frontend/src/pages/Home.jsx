import './css/home.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, IconBook } from '../components/Icons'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { supabase } from '../lib/supabaseClient'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shield-shaded" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 14.933a1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56" />
            </svg>,
            title: "Ironclad Security",
            description: "We employ enterprise-grade encryption to ensure every transaction is protected from unauthorized access."
        },
        {
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-diagram-2" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H11a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 5 7h2.5V6A1.5 1.5 0 0 1 6 4.5zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5zM3 11.5A1.5 1.5 0 0 1 4.5 10h1A1.5 1.5 0 0 1 7 11.5v1A1.5 1.5 0 0 1 5.5 14h-1A1.5 1.5 0 0 1 3 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 9 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
            </svg>,
            title: "Seamless Integration",
            description: "Designed with developers in mind. Integrate our robust API into your website in minutes, not days."
        },
        {
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
            </svg>,
            title: "Ideal User Experience",
            description: "A frictionless checkout process that turns visitors into loyal customers, boosting your conversion rates."
        },
        {
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
            </svg>,
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
                .order('payout_fee_flat', { ascending: true })
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
                        <Link to="/register" className="btn btn-start">Get Started <ArrowRight /></Link>
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
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
                                <span className="simbols">{item.svg}</span>
                                <h2 className="sub-title">{item.title}</h2>
                                </div>
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
                                // Karena semua data sekarang punya 'details', kita akses langsung dengan aman
                                const features = item.description?.details || [];

                                return (
                                    <div className="products-card" key={item.id}>
                                        <div className="product-head">
                                            <h2 className="title-plans" style={{ fontSize: '1.5rem', color: '#5DF8D8', marginBottom: '8px', padding: '20px 0' }}>
                                                {item.name}
                                            </h2>

                                            <div className="price-section" style={{ marginBottom: '16px', display: 'grid', flexDirection: 'column' }}>
                                                <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ffffff' }}>
                                                    {Number(item.transaction_fee_flat).toLocaleString('id-ID', { minimumFractionDigits: 1 }) + ' %'}<span style={{ fontWeight: '500', color: '#94a3b8', fontSize: '1rem' }}> / transaction</span>
                                                </span>
                                                <span style={{ fontSize: '1.4rem', fontWeight: '300', color: '#b4b4b483' }}>
                                                    IDR {Number(item.payout_fee_flat).toLocaleString('id-ID')}<span style={{ fontWeight: '200', color: '#94a3b8', fontSize: '0.9rem' }}> / withdrawal</span>
                                                </span>
                                            </div>
                                        </div>
                                        <ul className="plan-features" style={{ listStyle: 'none', textAlign: 'left' }}>
                                            {features.map((feature, idx) => (
                                                <li key={idx} style={{ color: '#ffffff', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
                                                    <span style={{ color: '#5DF8D8', fontWeight: 'bold' }}>✓</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <button className="plans-btn">Select a plan</button>
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
                            <Link to="/register" className="btn-primary">Join Now</Link>
                            <Link to="/documentation" className="btn-secondary">API Documentation</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}