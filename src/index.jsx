import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import gon from 'gon';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import App from './components/App';
import { UserProvider } from './components/UserContext';
import initStore from './redux/initStore';
import channelsSlice from './redux/slices/channels';
import messagesSlice from './redux/slices/messages';
import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const preloadedState = {
  channels: { list: gon.channels, currentChannelId: gon.currentChannelId },
  messages: { list: gon.messages },
};

const store = initStore(preloadedState);
const { dispatch } = store;
const { actions: { addMessage } } = messagesSlice;
const {
  actions: {
    addChannel,
    renameChannel,
    removeChannel,
  },
} = channelsSlice;

const socket = io();

socket.on('newChannel', (data) => dispatch(addChannel(data)));
socket.on('renameChannel', (data) => dispatch(renameChannel(data)));
socket.on('removeChannel', (data) => dispatch(removeChannel(data)));
socket.on('newMessage', (data) => dispatch(addMessage(data)));

ReactDOM.render(
  <Provider store={store}>
    <UserProvider>
      <App />
    </UserProvider>
  </Provider>,
  document.getElementById('chat'),
);
