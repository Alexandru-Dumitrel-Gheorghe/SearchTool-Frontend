import React from 'react';
import PdfUpload from '../components/PdfUpload';
import classes from './Upload.module.css';

function Upload() {
  return (
    <div className={classes.container}>
      
      <PdfUpload />
    </div>
  );
}

export default Upload;
