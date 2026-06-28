import './css/nav.css';
import { useState } from 'react';
import { IconMenu } from './Icons';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-glass">
      <div className="logo"></div>

      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li><Link to="/home" onClick={() => setIsOpen(false)}>Home</Link></li>
        <li><Link to="/Documentation" onClick={() => setIsOpen(false)}>API Docs</Link></li>
        <li><Link to="#support" onClick={() => setIsOpen(false)}>Support</Link></li>

        <li className="mobile-only-btn" style={{ marginTop: '1rem' }}>
          <Link to="/login" className="btn-glass" onClick={() => setIsOpen(false)}>Log in</Link>
          <Link to="/register" className="btn-glass" onClick={() => setIsOpen(false)}>Sign up</Link>
        </li>
      </ul>

      <div className="nav-actions">
        <Link to="/login" className="btn-glass">
          Log in
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
            <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
          </svg>
        </Link>
        <Link to="/register" className="btn-glass">Sign up</Link>
      </div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <IconMenu />
      </div>
    </nav>
  );
}