import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import gon from 'gon';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import App from './components/App';
import { UserProvider } from './components/UserContext';
import initStore from './redux/initStore';
import channelsSlice, { fetchChannelsAsync } from './redux/slices/channels';
import messagesSlice, { fetchMessagesByChannelIdsAsync } from './redux/slices/messages';
import '../assets/application.scss';

const init = () => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const preloadedState = {
    channels: { channels: gon.channels, currentChannelId: gon.currentChannelId },
    messages: { messages: gon.messages },
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

  const fetchChannelsAndMessages = async () => {
    try {
      const resultChannelsAction = await dispatch(fetchChannelsAsync());

      const channels = unwrapResult(resultChannelsAction);
      const channelIds = channels.map(({ id }) => id);

      const resultMessagesAction = await dispatch(fetchMessagesByChannelIdsAsync(channelIds));
      unwrapResult(resultMessagesAction);
    } catch (error) {
      fetchChannelsAndMessages();
    }
  };

  socket.on('reconnect', fetchChannelsAndMessages);
  socket.on('newChannel', ({ data: { attributes } }) => dispatch(addChannel(attributes)));
  socket.on('renameChannel', ({ data: { attributes } }) => dispatch(renameChannel(attributes)));
  socket.on('removeChannel', ({ data: { id } }) => dispatch(removeChannel(id)));
  socket.on('newMessage', ({ data: { attributes } }) => dispatch(addMessage(attributes)));

  ReactDOM.render(
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>,
    document.getElementById('chat'),
  );
};

export default init;
