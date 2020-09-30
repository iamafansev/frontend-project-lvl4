import axios from 'axios';
import keyBy from 'lodash/keyBy';
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
  initialState: { byId: {}, ids: [] },
  reducers: {
    setMessages: (state, { payload: messages }) => ({
      byId: keyBy(messages, 'id'),
      ids: messages.map(({ id }) => id),
    }),
    addMessage: (state, { payload }) => {
      const { data: { attributes } } = payload;
      const { id } = attributes;

      return {
        byId: { ...state.byId, [id]: attributes },
        ids: [...state.ids, id],
      };
    },
  },
});

export default messagesSlice;
