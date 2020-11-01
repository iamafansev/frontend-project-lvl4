import gon from 'gon';
import io from 'socket.io-client';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import initStore from './redux/initStore';
import initApp from './init';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const preloadedState = {
  channels: { channels: gon.channels, currentChannelId: gon.currentChannelId },
  messages: { messages: gon.messages },
};

const store = initStore(preloadedState);

const socket = io(window.location.origin);

const rootElement = document.getElementById('chat');

initApp(store, socket, rootElement);
