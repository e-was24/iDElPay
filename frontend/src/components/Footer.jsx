import "./css/Footer.css";

export default function Footer() {
    return (
        <footer className="site-footer">
            {/* <div className="footer-glow"></div> */}

            {/* <div className="footer-top">
                <div className="footer-brand">
                    <h3 className="footer-logo">iDElPay</h3>
                    <p className="footer-tagline">
                        Secure, fast, and fully integrated payment gateway
                        built for your business growth.
                    </p>
                    <div className="footer-socials">
                        <a href="#" aria-label="Instagram" className="social-icon">IG</a>
                        <a href="#" aria-label="LinkedIn" className="social-icon">LI</a>
                        <a href="#" aria-label="Twitter / X" className="social-icon">X</a>
                    </div>
                </div>

                <div className="footer-links">
                    <div className="footer-column">
                        <h4>Product</h4>
                        <ul>
                            <li><a href="#">Payment Gateway</a></li>
                            <li><a href="#">Virtual Account</a></li>
                            <li><a href="#">Disbursement</a></li>
                            <li><a href="#">API Docs</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Partners</a></li>
                            <li><a href="#">Blog</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Status</a></li>
                            <li><a href="#">Security</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Compliance</a></li>
                        </ul>
                    </div>
                </div>
            </div> */}
            <div className="icon-cover">
                <div className="icon"></div>
            </div>


            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} iDElPay. All rights reserved.</p>
                <p className="footer-bottom-note">Licensed & registered payment gateway provider.</p>
            </div>
        </footer>
    );
}