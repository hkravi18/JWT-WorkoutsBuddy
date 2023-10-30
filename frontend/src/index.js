import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//context 
import { ProductContextProvider } from './Context/ProductContext';
import { AuthContextProvider } from './Context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductContextProvider> 
        <App />
      </ProductContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);