import { unwrapResult } from '@reduxjs/toolkit';

import renderApp from './renderApp';
import initStore from './redux/initStore';
import channelsSlice, { fetchChannelsAsync } from './redux/slices/channels';
import messagesSlice, { fetchMessagesByChannelIdsAsync } from './redux/slices/messages';
import '../assets/application.scss';

const init = (data, socket) => {
  const preloadedState = {
    channels: { channels: data.channels, currentChannelId: data.currentChannelId },
    messages: { messages: data.messages },
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

  const fetchChannelsAndMessages = async () => {
    try {
      const resultChannelsAction = await dispatch(fetchChannelsAsync());

      const channels = unwrapResult(resultChannelsAction);
      const channelIds = channels.map(({ id }) => id);

      const resultMessagesAction = await dispatch(fetchMessagesByChannelIdsAsync(channelIds));
      unwrapResult(resultMessagesAction);
    } catch (error) {
      console.log(error);
    }
  };

  socket.on('reconnect', fetchChannelsAndMessages);
  socket.on('newChannel', ({ data: { attributes } }) => dispatch(addChannel(attributes)));
  socket.on('renameChannel', ({ data: { attributes } }) => dispatch(renameChannel(attributes)));
  socket.on('removeChannel', ({ data: { id } }) => dispatch(removeChannel(id)));
  socket.on('newMessage', ({ data: { attributes } }) => dispatch(addMessage(attributes)));

  renderApp(store);
};

export default init;
