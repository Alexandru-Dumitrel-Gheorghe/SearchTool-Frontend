// src/components/ProductsChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import classes from './ProductsChart.module.css';

function ProductsChart() {
  const [data, setData] = useState([]);
  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/produkte/stats`);
        setData(res.data.statsChart);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };
    fetchStats();
  }, [baseURL]);

  return (
    <div className={classes.chartContainer}>
      <h3>Products in Last 7 Days</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#4b6cb7" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProductsChart;
