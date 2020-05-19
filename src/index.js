import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { BrowserRouter } from 'react-router-dom'
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,

  document.getElementById('root')
);

