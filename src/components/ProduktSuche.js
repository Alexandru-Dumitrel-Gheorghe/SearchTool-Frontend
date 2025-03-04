// src/components/ProduktSuche.js
import React, { useState } from 'react';
import axios from 'axios';
import classes from './ProduktSuche.module.css';
import { FaSearch } from 'react-icons/fa'; // icon pentru buton

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
      console.error(error);
      setProdukt(null);
      setMeldung('Product not found or an error occurred.');
    }
  };

  return (
    <div className={classes.sucheContainer}>
      <div className={classes.formRow}>
        <label htmlFor="artikelnummer">Product Number:</label>
        <input
          className={classes.inputField}
          id="artikelnummer"
          type="text"
          value={artikelnummer}
          onChange={(e) => setArtikelnummer(e.target.value)}
          placeholder="Enter product number"
        />
        <button className={classes.searchButton} onClick={handleSuche}>
          <FaSearch className={classes.searchIcon} /> Search
        </button>
      </div>

      {produkt && (
        <div className={classes.result}>
          <p><strong>Product Number:</strong> {produkt.artikelnummer}</p>
          <p><strong>Description:</strong> {produkt.beschreibung}</p>
          {produkt.pdfPfad && (
            <a href={produkt.pdfPfad} target="_blank" rel="noreferrer">
              View PDF
            </a>
          )}
        </div>
      )}

      {meldung && <p className={classes.warnung}>{meldung}</p>}
    </div>
  );
}

export default ProduktSuche;
