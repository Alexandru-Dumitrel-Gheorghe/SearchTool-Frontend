// frontend/src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">Produkt-Portal</Link>
      </div>
      <nav className={classes.nav}>
        <ul>
          <li><Link to="/">Home</Link></li>
          {/* Dacă ai și alte pagini, le adaugi aici */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
