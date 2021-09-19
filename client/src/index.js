import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router basename="/">
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
