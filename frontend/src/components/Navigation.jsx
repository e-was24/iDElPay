import './css/nav.css';
import { useState } from 'react';
import { IconMenu } from './Icons';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const isDisabled = true

  return (
    <nav className="navbar navbar-glass">
      <div className="logo"></div>

      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li><Link className='Link-menu' style={!isDisabled ? { pointerEvents: "none", color: "gray", opacity: .5, userSelect: 'none' } : null} to="/home" onClick={() => setIsOpen(false)}>
          Home
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" /></svg></Link></li>
        <li><Link className='Link-menu' style={!isDisabled ? { pointerEvents: "none", color: "gray", opacity: .5, userSelect: 'none' } : null} to="/documentation" onClick={() => setIsOpen(false)}>
          API Docs
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m480-400-80-80 80-80 80 80-80 80Zm-85-235L295-735l185-185 185 185-100 100-85-85-85 85ZM225-295 40-480l185-185 100 100-85 85 85 85-100 100Zm510 0L635-395l85-85-85-85 100-100 185 185-185 185ZM480-40 295-225l100-100 85 85 85-85 100 100L480-40Z" /></svg></Link></li>
        <li><Link className='Link-menu' style={!isDisabled ? { pointerEvents: "none", color: "gray", opacity: .5, userSelect: 'none' } : null} to="/community" onClick={() => setIsOpen(false)}>
          Community
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M40-160v-160q0-34 23.5-57t56.5-23h131q20 0 38 10t29 27q29 39 71.5 61t90.5 22q49 0 91.5-22t70.5-61q13-17 30.5-27t36.5-10h131q34 0 57 23t23 57v160H640v-91q-35 25-75.5 38T480-200q-43 0-84-13.5T320-252v92H40Zm440-160q-38 0-72-17.5T351-386q-17-25-42.5-39.5T253-440q22-37 93-58.5T480-520q63 0 134 21.5t93 58.5q-29 0-55 14.5T609-386q-22 32-56 49t-73 17ZM160-440q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T280-560q0 50-34.5 85T160-440Zm640 0q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T920-560q0 50-34.5 85T800-440ZM480-560q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-680q0 50-34.5 85T480-560Z" /></svg></Link></li>
        <li><Link className='Link-menu' style={!isDisabled ? { pointerEvents: "none", color: "gray", opacity: .5, userSelect: 'none' } : null} to="/support" onClick={() => setIsOpen(false)}>
          Support
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M476-280q21 0 35.5-14.5T526-330q0-21-14.5-35.5T476-380q-21 0-35.5 14.5T426-330q0 21 14.5 35.5T476-280Zm-36-154h74q0-17 1.5-29t6.5-23q5-11 12.5-20.5T556-530q35-35 49.5-58.5T620-642q0-53-36-85.5T487-760q-55 0-93.5 27T340-658l66 26q7-27 28-43.5t49-16.5q27 0 45 14.5t18 38.5q0 17-11 36t-37 42q-17 14-27.5 27.5T453-505q-7 15-10 31.5t-3 39.5Zm40 394L360-160H200q-33 0-56.5-23.5T120-240v-560q0-33 23.5-56.5T200-880h560q33 0 56.5 23.5T840-800v560q0 33-23.5 56.5T760-160H600L480-40ZM200-240h192l88 88 88-88h192v-560H200v560Zm280-280Z" /></svg></Link></li>
        <li><Link className='Link-menu' style={!isDisabled ? { pointerEvents: "none", color: "gray", opacity: .5, userSelect: 'none' } : null} to="/aboutus" onClick={() => setIsOpen(false)}>
          About Us
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-280h80v-240h-80v240Zm68.5-331.5Q520-623 520-640t-11.5-28.5Q497-680 480-680t-28.5 11.5Q440-657 440-640t11.5 28.5Q463-600 480-600t28.5-11.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg></Link></li>

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