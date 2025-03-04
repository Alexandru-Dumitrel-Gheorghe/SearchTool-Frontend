// src/pages/Trash.js
import React from 'react';
import classes from './Trash.module.css';

function Trash() {
  return (
    <div className={classes.container}>
      <h1>Trash</h1>
      <p>Your trash is currently empty.</p>
      {/* Future enhancement: List deleted items here */}
    </div>
  );
}

export default Trash;
