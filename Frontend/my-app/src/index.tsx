import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App';

const container = document.getElementById('root'); // Get the root element from the DOM
const root = ReactDOM.createRoot(container as HTMLElement); // Create a root using createRoot()

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
