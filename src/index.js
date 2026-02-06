import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';

/**
 * Entry point for React application
 * Renders the App component into the root div
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
