/* eslint-disable react/jsx-filename-extension */

import ReactDOM from 'react-dom';
import React from 'react';
import gon from 'gon';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// import faker from 'faker';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

import App from './components/App';
import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('gon', gon);

ReactDOM.render(
  <App data={gon} />,
  document.getElementById('chat'),
);
