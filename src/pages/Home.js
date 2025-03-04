// src/pages/Home.js
import React from 'react';
import classes from './Home.module.css';

import StatsRow from '../components/StatsRow';
import ProductsChart from '../components/ProductsChart';
import AdvancedSearch from '../components/AdvancedSearch';
import ProduktSuche from '../components/ProduktSuche';
import ProduktListe from '../components/ProduktListe';
import PdfUpload from '../components/PdfUpload';

function Home() {
  return (
    <div className={classes.homeContainer}>
      {/* Row 1: Stats (stânga) + Chart (dreapta) */}
      <div className={classes.row1}>
        <StatsRow />
        <ProductsChart />
      </div>

      {/* Row 2: Advanced Search (full width) */}
      <div className={classes.row2}>
        <AdvancedSearch />
      </div>

      {/* Row 3: Două coloane -> stânga (Search + List), dreapta (Upload) */}
      <div className={classes.row3}>
        <div className={classes.leftColumn}>
          <h2>Search & List</h2>
          <div className={classes.searchSection}>
            <ProduktSuche />
          </div>
          <div className={classes.listSection}>
            <ProduktListe />
          </div>
        </div>

        <div className={classes.rightColumn}>
          <h2>Upload PDF</h2>
          <PdfUpload />
        </div>
      </div>
    </div>
  );
}

export default Home;
