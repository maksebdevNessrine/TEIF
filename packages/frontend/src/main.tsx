
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { waitForBackend } from './utils/wait-for-backend';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Wait for backend to be ready before rendering
const renderApp = () => {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Try to wait for backend, but proceed anyway if it takes too long
waitForBackend().finally(() => {
  renderApp();
});
