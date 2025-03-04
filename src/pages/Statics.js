// src/pages/Statics.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './Statics.module.css';
import { FaBox, FaFilePdf } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Statics() {
  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const [stats, setStats] = useState({
    totalProducts: 0,
    withPDF: 0,
    statsChart: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/api/produkte/stats`);
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, [baseURL]);

  return (
    <div className={classes.container}>
      <h1>Product Statistics</h1>
      
      <div className={classes.statsGrid}>
        <div className={classes.card}>
          <FaBox className={classes.icon} />
          <div className={classes.cardInfo}>
            <h3>Total Products</h3>
            <p>{stats.totalProducts}</p>
          </div>
        </div>
        <div className={classes.card}>
          <FaFilePdf className={classes.icon} />
          <div className={classes.cardInfo}>
            <h3>Products with PDF</h3>
            <p>{stats.withPDF}</p>
          </div>
        </div>
      </div>
      
      <div className={classes.chartContainer}>
        <h3>Products in Last 7 Days</h3>
        {stats.statsChart.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.statsChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#4b6cb7" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
}

export default Statics;
