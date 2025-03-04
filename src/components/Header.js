// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.dashboardTitle}>
        <h1>Dashboard Management</h1>
      </div>
      <div className={classes.rightSection}>
        <button className={classes.assignBtn}>+ Assign Member</button>
        <div className={classes.userInfo}>
          <span>Claudia Alves</span>
          <span className={classes.userRole}>Administrator</span>
        </div>
        <Link to="/" className={classes.homeLink}>Home</Link>
      </div>
    </header>
  );
}

export default Header;
