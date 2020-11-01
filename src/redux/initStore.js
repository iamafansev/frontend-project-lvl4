import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import channels from './slices/channels';
import messages from './slices/messages';
import modal from './slices/modal';

const reducer = combineReducers({
  channels,
  messages,
  modal,
});

export default (preloadedState) => configureStore({ reducer, preloadedState });
