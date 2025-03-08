// src/components/Header.js
import React from 'react';
import classes from './Header.module.css';

function Header() {
  return (
    <header className={classes.header}>
      <h1 className={classes.title}>My Pula</h1>
    </header>
  );
}

export default Header;
