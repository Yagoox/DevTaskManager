// frontend/src/pages/Panel/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import correto para React 18
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}else {
    console.error('Elemento com id "root" não encontrado.');
  }
