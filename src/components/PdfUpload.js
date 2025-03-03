// frontend/src/components/PdfUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import classes from './PdfUpload.module.css';

function PdfUpload() {
  const [artikelnummer, setArtikelnummer] = useState('');
  const [beschreibung, setBeschreibung] = useState('');
  const [pdfDatei, setPdfDatei] = useState(null);
  const [meldung, setMeldung] = useState('');

  // La fel, preluăm URL-ul
  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('artikelnummer', artikelnummer);
      formData.append('beschreibung', beschreibung);
      if (pdfDatei) {
        formData.append('pdfDatei', pdfDatei);
      }

      const response = await axios.post(
        `${baseURL}/api/produkte`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setMeldung(response.data.message);
      setArtikelnummer('');
      setBeschreibung('');
      setPdfDatei(null);
    } catch (error) {
      console.error(error);
      setMeldung('Fehler beim Hochladen des PDFs.');
    }
  };

  return (
    <div className={classes.uploadContainer}>
      <form onSubmit={handleSubmit} className={classes.uploadFields}>
        <div className={classes.fieldGroup}>
          <label htmlFor="artikelnummer">Artikelnummer:</label>
          <input
            className={classes.inputField}
            id="artikelnummer"
            type="text"
            value={artikelnummer}
            onChange={(e) => setArtikelnummer(e.target.value)}
            required
          />
        </div>

        <div className={classes.fieldGroup}>
          <label htmlFor="beschreibung">Beschreibung:</label>
          <input
            className={classes.inputField}
            id="beschreibung"
            type="text"
            value={beschreibung}
            onChange={(e) => setBeschreibung(e.target.value)}
          />
        </div>

        <div className={classes.fieldGroup}>
          <label htmlFor="pdfDatei">PDF-Datei:</label>
          <input
            className={classes.inputField}
            id="pdfDatei"
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfDatei(e.target.files[0])}
          />
        </div>

        <button type="submit" className={classes.uploadButton}>
          Hochladen
        </button>
      </form>

      {meldung && <p className={classes.info}>{meldung}</p>}
    </div>
  );
}

export default PdfUpload;
