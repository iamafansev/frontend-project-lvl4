import gon from 'gon';
import io from 'socket.io-client';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import runApp from './init';

const isProd = process.env.NODE_ENV === 'production';

if (!isProd) {
  localStorage.debug = 'chat:*';
}

const socketUrl = isProd ? 'https://blooming-wildwood-78196.herokuapp.com/' : 'http://localhost:5000/';
const socket = io(socketUrl);

runApp(gon, socket);
