// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import classes from './App.module.css';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className={classes.appContainer}>
      <Router>
        <div className={classes.layout}>
          {/* Sidebar pe stânga */}
          <Sidebar />

          {/* Zonă principală: Header sus + conținut */}
          <div className={classes.mainSection}>
            <Header />
            <div className={classes.mainContent}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
