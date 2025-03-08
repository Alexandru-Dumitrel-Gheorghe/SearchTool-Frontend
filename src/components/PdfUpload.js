// src/components/PdfUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUpload, FaFile } from 'react-icons/fa'; // icons
import classes from './PdfUpload.module.css';

function PdfUpload() {
  const [artikelnummer, setArtikelnummer] = useState('');
  const [beschreibung, setBeschreibung] = useState('');
  const [file, setFile] = useState(null);

  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile || null);
  };

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
    <form onSubmit={handleSubmit} className={classes.uploadForm}>
      <h2 className={classes.formTitle}>Upload Your File</h2>

      <div className={classes.fieldGroup}>
        <label htmlFor="artikelnummer">Product Number</label>
        <input
          className={classes.inputField}
          id="artikelnummer"
          type="text"
          placeholder="Enter product number"
          value={artikelnummer}
          onChange={(e) => setArtikelnummer(e.target.value)}
          required
        />
      </div>

      <div className={classes.fieldGroup}>
        <label htmlFor="beschreibung">Description</label>
        <input
          className={classes.inputField}
          id="beschreibung"
          type="text"
          placeholder="Enter description"
          value={beschreibung}
          onChange={(e) => setBeschreibung(e.target.value)}
        />
      </div>

      <div className={classes.fieldGroup}>
        <label>Upload File</label>
        <div className={classes.customFileInput}>
          <label htmlFor="fileInput" className={classes.chooseFileBtn}>
            <FaFile className={classes.fileIcon} /> Choose File
          </label>
          <input
            id="fileInput"
            type="file"
            className={classes.hiddenInput}
            onChange={handleFileSelect}
          />
          <span className={classes.fileName}>
            {file ? file.name : 'No file selected'}
          </span>
        </div>
      </div>

      <button type="submit" className={classes.uploadButton}>
        <FaUpload className={classes.uploadIcon} /> Upload
      </button>
    </form>
  );
}

export default PdfUpload;
