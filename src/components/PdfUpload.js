import React, { useState } from 'react';
import axios from 'axios';
import classes from './PdfUpload.module.css';

function PdfUpload() {
  const [artikelnummer, setArtikelnummer] = useState('');
  const [beschreibung, setBeschreibung] = useState('');
  const [file, setFile] = useState(null);
  const [meldung, setMeldung] = useState('');

  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('artikelnummer', artikelnummer);
      formData.append('beschreibung', beschreibung);
      if (file) {
        formData.append('pdfDatei', file);
      }

      const response = await axios.post(
        `${baseURL}/api/produkte`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setMeldung(response.data.message);
      setArtikelnummer('');
      setBeschreibung('');
      setFile(null);
    } catch (error) {
      console.error(error);
      setMeldung('Fehler beim Hochladen der Datei.');
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
          <label htmlFor="pdfDatei">Datei hochladen:</label>
          <input
            className={classes.inputField}
            id="pdfDatei"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
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
