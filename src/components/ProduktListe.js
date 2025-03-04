// src/components/ProduktListe.js
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import classes from './ProduktListe.module.css';

function ProduktListe() {
  const [produkte, setProdukte] = useState([]);
  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const loadProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}/api/produkte`);
      setProdukte(response.data.produkte || response.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load products');
    }
  }, [baseURL]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDelete = async (artikelnummer) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${baseURL}/api/produkte/${artikelnummer}`);
      toast.success('Product deleted!');
      loadProducts();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className={classes.listeContainer}>
      <ul>
        {produkte.map((prod) => (
          <li key={prod._id}>
            <strong>{prod.artikelnummer}</strong> – {prod.beschreibung}{' '}
            {prod.pdfPfad && (
              <a href={prod.pdfPfad} target="_blank" rel="noreferrer">
                View PDF
              </a>
            )}
            <button
              className={classes.deleteBtn}
              onClick={() => handleDelete(prod.artikelnummer)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProduktListe;
