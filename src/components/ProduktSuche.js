// frontend/src/components/ProduktSuche.js
import React, { useState } from 'react';
import axios from 'axios';
import classes from './ProduktSuche.module.css';

function ProduktSuche() {
  const [artikelnummer, setArtikelnummer] = useState('');
  const [produkt, setProdukt] = useState(null);
  const [meldung, setMeldung] = useState('');

  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleSuche = async () => {
    if (!artikelnummer) return;
    try {
      const response = await axios.get(`${baseURL}/api/produkte/${artikelnummer}`);
      setProdukt(response.data);
      setMeldung('');
    } catch (error) {
      setProdukt(null);
      setMeldung('Produkt nicht gefunden oder Fehler aufgetreten.');
    }
  };

  return (
    <div className={classes.sucheContainer}>
      <div className={classes.formRow}>
        <label htmlFor="artikelnummer">Artikelnummer:</label>
        <input
          className={classes.inputField}
          id="artikelnummer"
          type="text"
          value={artikelnummer}
          onChange={(e) => setArtikelnummer(e.target.value)}
          placeholder="Artikelnummer eingeben"
        />
        <button className={classes.searchButton} onClick={handleSuche}>Suchen</button>
      </div>

      {produkt && (
        <div className={classes.result}>
          <p><strong>Artikelnummer:</strong> {produkt.artikelnummer}</p>
          <p><strong>Beschreibung:</strong> {produkt.beschreibung}</p>
          {produkt.pdfPfad && (
            <a
              href={`${baseURL}/${produkt.pdfPfad}`}
              target="_blank"
              rel="noreferrer"
            >
              PDF ansehen
            </a>
          )}
        </div>
      )}

      {meldung && <p className={classes.warnung}>{meldung}</p>}
    </div>
  );
}

export default ProduktSuche;
