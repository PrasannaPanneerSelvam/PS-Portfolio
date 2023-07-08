import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import AppStateContextComponent from './context/AppContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppStateContextComponent>
      <App />
    </AppStateContextComponent>
  </React.StrictMode>
);
