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
  initialState: { list: [] },
  reducers: {
    addMessage: ({ list }, { payload: message }) => ({ list: [...list, message] }),
    removeMessagesByChannelId: ({ list }, { payload: channelId }) => {
      const filteredList = list.filter((message) => message.channelId !== channelId);

      return { list: filteredList };
    },
  },
  extraReducers: {
    [fetchMessagesByChannelIdsAsync.fulfilled]: ({ list }, { payload: messages }) => {
      const diff = differenceWith(messages, list, isEqual);
      list.push(...diff);
    },
  },
});

export default messagesSlice;
