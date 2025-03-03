// frontend/src/pages/Home.js
import React from 'react';
import classes from './Home.module.css';

import ProduktSuche from '../components/ProduktSuche';
import PdfUpload from '../components/PdfUpload';
import ProduktListe from '../components/ProduktListe';

function Home() {
  return (
    <div className={classes.homeContainer}>
      {/* Secțiunea principală (header text) */}
      <section className={classes.heroSection}>
        <h1>Willkommen zum Produkt-Portal</h1>
        <p>Verwalte deine Produkte, lade Arbeitsanleitungen hoch und finde alles schnell!</p>
      </section>

      {/* Secțiunea de căutare */}
      <section className={classes.sectionBox}>
        <h2>Produkt nach Artikelnummer suchen</h2>
        <ProduktSuche />
      </section>

      {/* Secțiunea de upload */}
      <section className={classes.sectionBox}>
        <h2>Arbeitsanleitung (PDF) hochladen</h2>
        <PdfUpload />
      </section>

      {/* Secțiunea listă */}
      <section className={classes.sectionBox}>
        <h2>Produktliste</h2>
        <ProduktListe />
      </section>
    </div>
  );
}

export default Home;
