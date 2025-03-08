// src/pages/Files.js
import React from 'react';
import ProduktListe from '../components/ProduktListe';
import classes from './Files.module.css';
import { FaFolderOpen } from 'react-icons/fa'; // Example icon

function Files() {
  return (
    <div className={classes.filesPage}>
      <div className={classes.filesContainer}>
        <div className={classes.filesHeader}>
          <FaFolderOpen className={classes.filesIcon} />
          <h2 className={classes.filesTitle}>All Files</h2>
        </div>
        <ProduktListe />
      </div>
    </div>
  );
}

export default Files;
