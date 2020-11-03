import ReactDOM from 'react-dom';
import gon from 'gon';
import io from 'socket.io-client';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import initApp from './init';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io(window.location.origin);

const app = initApp(gon, socket);

ReactDOM.render(app, document.getElementById('chat'));
