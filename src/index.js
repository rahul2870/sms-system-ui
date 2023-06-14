import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store';  // redux-toolkit store
import { Provider } from 'react-redux'
import './global.scss';
import 'react-notifications/lib/notifications.css';
import App from './App';

// there is no reducer for it but in future may needed.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
); 
