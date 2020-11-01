/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import remove from 'lodash/remove';

import routes from '../../routes';

const fetchMessagesAsync = createAsyncThunk(
  'channels/fetchMessages',
  async () => {
    const route = routes.messagesPath();
    const { data: { data } } = await axios.get(route);

    return data.map(({ attributes }) => attributes);
  },
);

const createMessageAsync = createAsyncThunk(
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
    [fetchMessagesAsync.fulfilled]: (state, { payload: newMessages }) => {
      state.messages = newMessages;
    },
    'channels/removeChannel': (state, { payload: channelId }) => {
      remove(state.messages, (message) => message.channelId === channelId);
    },
    'channels/fetchChannelsWithMessages': (state, { payload: { messages: newMessages } }) => {
      state.messages = newMessages;
    },
  },
});

export const { addMessage } = messagesSlice.actions;
export { fetchMessagesAsync, createMessageAsync };

export default messagesSlice.reducer;
