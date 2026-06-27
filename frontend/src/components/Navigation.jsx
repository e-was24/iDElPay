import './css/nav.css';
import { useState } from 'react';
import { IconMenu } from './Icons';
import { Link } from 'react-router-dom';
import { ArrowRight } from './Icons';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-glass">
      <div className="logo"></div>

      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li><Link to="/home" onClick={() => setIsOpen(false)}>Branda</Link></li>
        <li><Link to="/Documentation" onClick={() => setIsOpen(false)}>API Docs</Link></li>
        <li><Link to="#support" onClick={() => setIsOpen(false)}>Support</Link></li>
        
        <li className="mobile-only-btn" style={{marginTop: '1rem'}}>
          <button className="btn-glass" onClick={() => setIsOpen(false)}>Get Started</button>
        </li>
      </ul>

      <div className="nav-actions">
        <Link to="#" className="btn-glass">Get Started <ArrowRight /></Link>
      </div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <IconMenu />
      </div>
    </nav>
  );
}