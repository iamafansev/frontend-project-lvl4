import renderApp from './renderApp';
import {
  fetchChannelsAsync,
  addChannel,
  renameChannel,
  removeChannel,
} from './redux/slices/channels';
import { addMessage, fetchMessagesAsync } from './redux/slices/messages';
import '../assets/application.scss';

const init = (store, socket, rootElement) => {
  const { dispatch } = store;

  socket.on('reconnect', () => {
    dispatch(fetchChannelsAsync());
    dispatch(fetchMessagesAsync());
  });
  socket.on('newChannel', ({ data: { attributes } }) => dispatch(addChannel(attributes)));
  socket.on('renameChannel', ({ data: { attributes } }) => dispatch(renameChannel(attributes)));
  socket.on('removeChannel', ({ data: { id } }) => dispatch(removeChannel(id)));
  socket.on('newMessage', ({ data: { attributes } }) => dispatch(addMessage(attributes)));

  renderApp(store, rootElement);
};

export default init;
