/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import gon from 'gon';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';

import App from './components/App';
import store from './redux/store';
import channelsSlice from './redux/slices/channels';
import messagesSlice from './redux/slices/messages';
import UserContext from './UserContext';
import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const { dispatch } = store;
const { actions: { setMessages, addMessage } } = messagesSlice;
const { actions: { setChannels, setCurrentChannelId } } = channelsSlice;

const socket = io('/');

socket.on('newMessage', ({ data: { attributes: message } }) => {
  dispatch(addMessage(message));
});

dispatch(setChannels(gon.channels));
dispatch(setCurrentChannelId(gon.currentChannelId));
dispatch(setMessages(gon.messages));

// eslint-disable-next-line functional/no-let
let nickname = cookies.get('nickname');

if (isEmpty(nickname)) {
  nickname = faker.name.findName();
  cookies.set('nickname', nickname);
}

ReactDOM.render(
  <Provider store={store}>
    <UserContext.Provider value={nickname}>
      <App />
    </UserContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
