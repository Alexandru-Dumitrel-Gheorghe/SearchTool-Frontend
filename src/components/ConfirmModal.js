// src/components/ConfirmModal.js
import React from 'react';
import classes from './ConfirmModal.module.css';

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <p>{message}</p>
        <div className={classes.buttons}>
          <button className={classes.confirm} onClick={onConfirm}>Yes</button>
          <button className={classes.cancel} onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
