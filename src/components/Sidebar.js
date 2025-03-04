// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChartBar, FaTrash } from 'react-icons/fa'; // ICONIȚE
import classes from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={classes.sidebar}>
      <div className={classes.logo}>
        <h2>Search Tool</h2>
      </div>
      <ul className={classes.menu}>
        <li>
          <Link to="/">
            <FaHome className={classes.icon} />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/stats">
            <FaChartBar className={classes.icon} />
            Statistics
          </Link>
        </li>
        <li>
          <Link to="/trash">
            <FaTrash className={classes.icon} />
            Trash
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
