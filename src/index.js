import gon from 'gon';
import io from 'socket.io-client';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import runApp from './init';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io();

runApp(gon, socket);
