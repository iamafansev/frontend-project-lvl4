/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import remove from 'lodash/remove';

import routes from '../../routes';

export const createMessageAsync = createAsyncThunk(
  'messages/createMessage',
  async ({ channelId, nickname, body }) => {
    const route = routes.channelMessagesPath(channelId);
    const attributes = { nickname, body };
    const { data: { data } } = await axios.post(route, { data: { attributes } });
    return data;
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  reducers: {
    addMessage: ({ messages }, { payload: message }) => {
      messages.push(message);
    },
  },
  extraReducers: {
    'channels/removeChannel': (state, { payload: channelId }) => {
      remove(state.messages, (message) => message.channelId === channelId);
    },
    'channels/fetchChannelsWithMessages': (state, { payload: { messages: newMessages } }) => {
      state.messages = newMessages;
    },
  },
});

export default messagesSlice;
