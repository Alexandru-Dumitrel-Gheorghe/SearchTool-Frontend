// src/components/MemoryUsage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Label
} from 'recharts';
import { toast } from 'react-toastify';
import classes from './MemoryUsage.module.css';

function MemoryUsage() {
  const [memoryData, setMemoryData] = useState([
    { name: 'Used', value: 0 },
    { name: 'Free', value: 0 },
  ]);
  const [percentageUsed, setPercentageUsed] = useState(0);

  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchMemory = async () => {
      try {
        // Example: /api/system/memory => { total: 16, used: 8 }
        const response = await axios.get(`${baseURL}/api/system/memory`);
        const { total, used } = response.data;
        if (!total || total === 0) {
          toast.error('Memory data is invalid.');
          return;
        }

        const free = total - used;
        const usedPercentage = ((used / total) * 100).toFixed(1);

        setMemoryData([
          { name: 'Used', value: used },
          { name: 'Free', value: free },
        ]);
        setPercentageUsed(usedPercentage);
      } catch (error) {
        console.error('Error fetching memory data:', error);
        toast.error('Failed to load memory usage.');
      }
    };
    fetchMemory();
  }, [baseURL]);

  // Colors for the two slices
  const COLORS = ['#ff5e62', '#4b6cb7'];

  // A custom label in the center that shows e.g. "XX%"
  const renderCustomizedLabel = ({
    cx,
    cy,
  }) => {
    return (
      <text
        x={cx}
        y={cy}
        fill="#333"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: '1rem', fontWeight: 'bold' }}
      >
        {`${percentageUsed}%`}
      </text>
    );
  };

  return (
    <div className={classes.memoryCard}>
      <h3 className={classes.cardTitle}>Memory Usage</h3>
      <div className={classes.chartWrapper}>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={memoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {memoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MemoryUsage;
