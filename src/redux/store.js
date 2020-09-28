import { configureStore } from '@reduxjs/toolkit';

import channelsSlice from './slices/channels';
import messagesSlice from './slices/messages';

const reducer = {
  [channelsSlice.name]: channelsSlice.reducer,
  [messagesSlice.name]: messagesSlice.reducer,
};

const store = configureStore({ reducer });

export default store;
