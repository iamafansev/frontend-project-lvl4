import React from 'react';
import { Provider } from 'react-redux';

import {
  fetchChannelsAsync,
  addChannel,
  renameChannel,
  removeChannel,
} from './redux/slices/channels';
import { addMessage, fetchMessagesAsync } from './redux/slices/messages';
import { UserProvider } from './components/UserContext';
import App from './components/App';
import '../assets/application.scss';

const init = (store, socket) => {
  const { dispatch } = store;

  socket.on('reconnect', () => {
    dispatch(fetchChannelsAsync());
    dispatch(fetchMessagesAsync());
  });
  socket.on('newChannel', ({ data: { attributes } }) => dispatch(addChannel(attributes)));
  socket.on('renameChannel', ({ data: { attributes } }) => dispatch(renameChannel(attributes)));
  socket.on('removeChannel', ({ data: { id } }) => dispatch(removeChannel(id)));
  socket.on('newMessage', ({ data: { attributes } }) => dispatch(addMessage(attributes)));

  return (
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  );
};

export default init;
