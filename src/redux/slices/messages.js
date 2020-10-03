import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import routes from '../../routes';

export const createMessageAsync = createAsyncThunk(
  'messages/createMessage',
  async ({ channelId, nickname, body }) => {
    const route = routes.channelMessagesPath(channelId);
    const attributes = { nickname, body };
    const { data } = await axios.post(route, { data: { attributes } });
    return data;
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { list: [] },
  reducers: {
    setMessages: (state, { payload: messages }) => ({ list: messages }),
    addMessage: ({ list }, { payload: message }) => ({ list: [...list, message] }),
    removeMessagesByChannelId: ({ list }, { payload: channelId }) => (
      { list: list.filter((message) => message.channelId !== channelId) }
    ),
  },
});

export default messagesSlice;
