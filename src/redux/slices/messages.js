import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import routes from '../../routes';

export const createMessage = createAsyncThunk(
  'messages/createMessage',
  async ({ channelId, nickname, body }) => {
    const route = routes.channelMessagesPath(channelId);
    const attributes = { nickname, body };
    const { data: { data } } = await axios.post(route, { data: { attributes } });
    return data.attributes;
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { list: [] },
  reducers: {
    setMessages: (state, { payload }) => ({ ...state, list: payload }),
    addMessage: (state, { payload }) => ({ ...state, list: [...state.list, payload] }),
  },
});

export default messagesSlice;
