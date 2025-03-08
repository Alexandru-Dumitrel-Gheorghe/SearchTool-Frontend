// src/pages/Home.js
import React from 'react';
import classes from './Home.module.css';

import StatsRow from '../components/StatsRow';
import ProductsChart from '../components/ProductsChart';
import AdvancedSearch from '../components/AdvancedSearch';
import ProduktSuche from '../components/ProduktSuche';
import MemoryUsage from '../components/MemoryUsage'; // Import the new component

function Home() {
  return (
    <div className={classes.dashboardContainer}>
      {/* Top Section: Welcome card + Daily Visitors (example) */}
      <div className={classes.topSection}>
        <div className={classes.welcomeCard}>
          <h2>Welcome back, Arnold</h2>
          <p>Get familiar with dashboard, manage products & stats in no time!</p>
          <ul>
            <li>Check stats for new products and PDF uploads</li>
            <li>Search or filter your products quickly</li>
            <li>Access advanced features like the Manager app</li>
          </ul>
          <button className={classes.learnMoreBtn}>Learn More</button>
        </div>

        <div className={classes.dailyVisitorsCard}>
          <h3>Daily Visitors</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>1,245</p>
          <p>Compared to last week, you have a 12% increase in daily traffic.</p>
        </div>
      </div>

      {/* Middle Section: Stats & Orders */}
      <div className={classes.middleSection}>
        <StatsRow />
        <div className={classes.ordersCard}>
          <h3>Orders in Website</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>14.3K</p>
          <p>
            Monthly Profit: <strong>$3,245</strong>
          </p>
        </div>
      </div>

      {/* Chart & Quick Info Section */}
      <div className={classes.chartSection}>
        <div className={classes.chartCard}>
          <h3>Popular Products / Earnings</h3>
          <ProductsChart />
        </div>

        <div className={classes.searchCard}>
          <h3>Quick Product Search</h3>
          <ProduktSuche />
        </div>

        {/* New Memory Usage component */}
        <MemoryUsage />
      </div>

      {/* Advanced Search Section */}
      <div className={classes.advSearchSection}>
        <h3>Advanced Search</h3>
        <AdvancedSearch />
      </div>
    </div>
  );
}

export default Home;
