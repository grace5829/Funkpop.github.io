import React from 'react';
import { createRoot } from 'react-dom/client.js';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './app/App';
import { BrowserRouter as Router } from 'react-router-dom';

const root = createRoot(document.getElementById('app'));

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
