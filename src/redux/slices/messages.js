import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';

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

export const fetchMessagesByChannelIdsAsync = createAsyncThunk(
  'messages/fetchMessagesByChannelIds',
  (channelIds) => {
    const promises = channelIds.map((id) => {
      const route = routes.channelMessagesPath(id);
      return axios.get(route).then(({ data: { data } }) => data);
    });

    return Promise.all(promises).then((data) => data.flat().map(({ attributes }) => attributes));
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
    [fetchMessagesByChannelIdsAsync.fulfilled]: ({ messages }, { payload: newMessages }) => {
      const diff = differenceWith(newMessages, messages, isEqual);
      messages.push(...diff);
    },
    'channels/removeChannel': ({ messages }, { payload: channelId }) => {
      const filteredMessages = messages.filter((message) => message.channelId !== channelId);

      return { messages: filteredMessages };
    },
  },
});

export default messagesSlice;
