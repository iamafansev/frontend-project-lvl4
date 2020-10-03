import { configureStore } from '@reduxjs/toolkit';

import channelsSlice from './slices/channels';
import messagesSlice from './slices/messages';
import modalSlice from './slices/modal';

const reducer = {
  [channelsSlice.name]: channelsSlice.reducer,
  [messagesSlice.name]: messagesSlice.reducer,
  [modalSlice.name]: modalSlice.reducer,
};

export default (preloadedState) => configureStore({ reducer, preloadedState });
