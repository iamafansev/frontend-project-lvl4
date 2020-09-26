/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import gon from 'gon';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// import faker from 'faker';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

import App from './components/App';
import store from './redux/store';
import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(
  <Provider store={store}>
    <App data={gon} />
  </Provider>,
  document.getElementById('chat'),
);
