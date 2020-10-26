/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';
import first from 'lodash/first';
import remove from 'lodash/remove';

import routes from '../../routes';

export const createChannelAsync = createAsyncThunk(
  'channels/createChannel',
  async (name) => {
    const route = routes.channelsPath();
    const attributes = { name };
    const { data } = await axios.post(route, { data: { attributes } });
    return data;
  },
);

export const removeChannelAsync = createAsyncThunk(
  'channels/removeChannel',
  async (id) => {
    const route = routes.channelPath(id);
    const { data } = await axios.delete(route);
    return data;
  },
);

export const renameChannelAsync = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, name }) => {
    const route = routes.channelPath(id);
    const attributes = { name };
    const { data } = await axios.patch(route, { data: { attributes } });
    return data;
  },
);

export const fetchChannelsAsync = createAsyncThunk(
  'messages/fetchChannels',
  async () => {
    const route = routes.channelsPath();
    const { data: { data } } = await axios.get(route);

    return data.map(({ attributes }) => attributes);
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { channels: [], currentChannelId: null },
  reducers: {
    setCurrentChannelId: (state, { payload: newCurrentChannelId }) => {
      state.currentChannelId = newCurrentChannelId;
    },
    addChannel: ({ channels }, { payload: channel }) => {
      channels.push(channel);
    },
    renameChannel: (state, { payload: { id, name: newName } }) => {
      const currentChannel = state.channels.find((channel) => channel.id === id);
      currentChannel.name = newName;
    },
    removeChannel: (state, { payload: id }) => {
      const { currentChannelId, channels } = state;
      const newCurrentChannelId = currentChannelId === id
        ? first(channels).id
        : currentChannelId;

      state.currentChannelId = newCurrentChannelId;
      remove(state.channels, (channel) => channel.id === id);
    },
  },
  extraReducers: {
    [fetchChannelsAsync.fulfilled]: ({ channels }, { payload: newChannels }) => {
      const diff = differenceWith(newChannels, channels, isEqual);
      channels.push(...diff);
    },
  },
});

export default channelsSlice;
