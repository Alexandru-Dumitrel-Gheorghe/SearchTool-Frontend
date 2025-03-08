import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import classes from './App.module.css';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import Statics from './pages/Statics';
import Trash from './pages/Trash';
import Upload from './pages/Upload';
import Files from './pages/Files'; // Import the new Files page
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className={classes.appContainer}>
      <Router>
        <div className={classes.layout}>
          {/* Sidebar on the left */}
          <Sidebar />

          {/* Main Section: Header and content */}
          <div className={classes.mainSection}>
            <Header />
            <div className={classes.mainContent}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stats" element={<Statics />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/files" element={<Files />} />
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
