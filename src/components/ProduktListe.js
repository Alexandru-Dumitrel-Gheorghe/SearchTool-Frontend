import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './ProduktListe.module.css';

function ProduktListe() {
  const [produkte, setProdukte] = useState([]);
  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const ladeProdukte = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/produkte`);
        setProdukte(response.data);
      } catch (error) {
        console.error('Fehler beim Laden der Produkte:', error);
      }
    };
    ladeProdukte();
  }, [baseURL]);

  return (
    <div className={classes.listeContainer}>
      <ul>
        {produkte.map((prod) => (
          <li key={prod._id}>
            <strong>{prod.artikelnummer}</strong> – {prod.beschreibung}{' '}
            {prod.pdfPfad && (
              <a
                href={prod.pdfPfad}
                target="_blank"
                rel="noreferrer"
              >
                PDF ansehen
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProduktListe;
