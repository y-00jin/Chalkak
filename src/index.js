import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MapProvider } from 'context/MapContext';  // MapProvider를 가져옵니다.


import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <MapProvider>
      <App />
    </MapProvider>
    {/* <React.StrictMode> */}
    {/* </React.StrictMode> */}
  </BrowserRouter>
);
