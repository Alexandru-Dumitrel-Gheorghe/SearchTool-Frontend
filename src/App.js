// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import classes from './App.module.css';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import Statics from './pages/Statics';
import Trash from './pages/Trash'; // Import Trash page
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className={classes.appContainer}>
      <Router>
        <div className={classes.layout}>
          {/* Sidebar pe stânga */}
          <Sidebar />
          
          {/* Zona principală: Header sus + conținut */}
          <div className={classes.mainSection}>
            <Header />
            <div className={classes.mainContent}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stats" element={<Statics />} />
                <Route path="/trash" element={<Trash />} />
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
