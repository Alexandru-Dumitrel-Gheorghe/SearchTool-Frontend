// src/components/PdfUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Importăm toast
import classes from './PdfUpload.module.css';

function PdfUpload() {
  const [artikelnummer, setArtikelnummer] = useState('');
  const [beschreibung, setBeschreibung] = useState('');
  const [file, setFile] = useState(null);

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

      // Afișăm mesajul de succes cu Toastify
      toast.success(response.data.message || 'File uploaded successfully!');
      setArtikelnummer('');
      setBeschreibung('');
      setFile(null);
    } catch (error) {
      console.error(error);
      toast.error('Error uploading file.');
    }
  };

  return (
    <div className={classes.uploadContainer}>
      <form onSubmit={handleSubmit} className={classes.uploadFields}>
        <div className={classes.fieldGroup}>
          <label htmlFor="artikelnummer">Product Number:</label>
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
          <label htmlFor="beschreibung">Description:</label>
          <input
            className={classes.inputField}
            id="beschreibung"
            type="text"
            value={beschreibung}
            onChange={(e) => setBeschreibung(e.target.value)}
          />
        </div>

        <div className={classes.fieldGroup}>
          <label htmlFor="pdfDatei">Upload File:</label>
          <input
            className={classes.inputField}
            id="pdfDatei"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button type="submit" className={classes.uploadButton}>
          Upload
        </button>
      </form>
    </div>
  );
}

export default PdfUpload;
