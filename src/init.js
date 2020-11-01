import renderApp from './renderApp';
import { fetchChannelsWithMessagesAsync } from './redux/actions';
import channelsSlice from './redux/slices/channels';
import messagesSlice from './redux/slices/messages';
import '../assets/application.scss';

const init = (store, socket, rootElement) => {
  const { dispatch } = store;
  const { actions: { addMessage } } = messagesSlice;
  const {
    actions: {
      addChannel,
      renameChannel,
      removeChannel,
    },
  } = channelsSlice;

  socket.on('reconnect', () => dispatch(fetchChannelsWithMessagesAsync()));
  socket.on('newChannel', ({ data: { attributes } }) => dispatch(addChannel(attributes)));
  socket.on('renameChannel', ({ data: { attributes } }) => dispatch(renameChannel(attributes)));
  socket.on('removeChannel', ({ data: { id } }) => dispatch(removeChannel(id)));
  socket.on('newMessage', ({ data: { attributes } }) => dispatch(addMessage(attributes)));

  renderApp(store, rootElement);
};

export default init;
