// frontend/src/pages/Panel/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';

console.log('Iniciando o React App...');

const rootElement = document.getElementById('root');

if (rootElement) {
  console.log('Elemento "root" encontrado:', rootElement);
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('React App renderizado com sucesso.');
} else {
  console.error('Elemento com id "root" não encontrado.');
}
