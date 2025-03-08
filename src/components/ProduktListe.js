// src/components/ProduktListe.js
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import classes from './ProduktListe.module.css';
import ConfirmModal from './ConfirmModal';

function ProduktListe() {
  const [produkte, setProdukte] = useState([]);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const loadProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}/api/produkte`);
      setProdukte(response.data.produkte || response.data);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products');
    }
  }, [baseURL]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDeleteClick = (artikelnummer) => {
    setProductToDelete(artikelnummer);
    setConfirmModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await axios.delete(`${baseURL}/api/produkte/${productToDelete}`);
      toast.success('Product deleted!');
      setConfirmModalVisible(false);
      setProductToDelete(null);
      loadProducts();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete product');
    }
  };

  const handleCancelDelete = () => {
    setConfirmModalVisible(false);
    setProductToDelete(null);
  };

  // For opening the PDF in a new tab
  const handleOpenPDF = (pdfUrl) => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    } else {
      toast.info('No file available.');
    }
  };

  return (
    <div className={classes.listeContainer}>
      <ul>
        {produkte.map((prod) => (
          <li key={prod._id} className={classes.productItem}>
            <div className={classes.details}>
              <span className={classes.artikelnummer}>
                <strong>{prod.artikelnummer}</strong>
              </span>
              <span className={classes.beschreibung}>
                {prod.beschreibung || 'No description'}
              </span>
            </div>
            <div className={classes.actions}>
              <button
                className={classes.openBtn}
                onClick={() => handleOpenPDF(prod.pdfPfad)}
              >
                Open
              </button>
              <button
                className={classes.deleteBtn}
                onClick={() => handleDeleteClick(prod.artikelnummer)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {confirmModalVisible && (
        <ConfirmModal
          message="Are you sure you want to delete this product?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default ProduktListe;
