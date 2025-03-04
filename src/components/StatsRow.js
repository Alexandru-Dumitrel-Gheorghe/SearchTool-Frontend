// src/components/StatsRow.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './StatsRow.module.css';

function StatsRow() {
  const [stats, setStats] = useState({ totalProducts: 0, withPDF: 0 });
  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/api/produkte/stats`);
        setStats({
          totalProducts: data.totalProducts,
          withPDF: data.withPDF
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, [baseURL]);

  return (
    <div className={classes.statsRow}>
      <div className={classes.statCard}>
        <h3>Total Products</h3>
        <p>{stats.totalProducts}</p>
      </div>
      <div className={classes.statCard}>
        <h3>Products with PDF</h3>
        <p>{stats.withPDF}</p>
      </div>
    </div>
  );
}

export default StatsRow;
