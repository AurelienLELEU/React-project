import React, { useState, useEffect } from 'react';
import './App.css';

const Modal = ({ onClose, name, description, seller, photo, price, currency }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-btn" onClick={onClose}>&times;</span>
                <div className="modal-img-container">
                    <img src={photo} alt="modal" />
                </div>
                <div className="modal-details">
                    <h5>{name}</h5>
                    <p>{description}</p>
                        <p>Price: {Math.round(price)} {currency}</p>
                    <p>Sold by: <b>{seller}</b></p>
                </div>
            </div>
        </div>
    );
};

export default Modal;
