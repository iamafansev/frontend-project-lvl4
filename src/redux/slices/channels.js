/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import first from 'lodash/first';
import remove from 'lodash/remove';

import routes from '../../routes';

const fetchChannelsAsync = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const route = routes.channelsPath();
    const { data: { data } } = await axios.get(route);

    return data.map(({ attributes }) => attributes);
  },
);

const createChannelAsync = createAsyncThunk(
  'channels/createChannel',
  async (name) => {
    const route = routes.channelsPath();
    const attributes = { name };
    const { data } = await axios.post(route, { data: { attributes } });
    return data;
  },
);

const removeChannelAsync = createAsyncThunk(
  'channels/removeChannel',
  async (id) => {
    const route = routes.channelPath(id);
    const { data } = await axios.delete(route);
    return data;
  },
);

const renameChannelAsync = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, name }) => {
    const route = routes.channelPath(id);
    const attributes = { name };
    const { data } = await axios.patch(route, { data: { attributes } });
    return data;
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
    [fetchChannelsAsync.fulfilled]: (state, { payload: newChannels }) => {
      state.channels = newChannels;
    },
  },
});

export const {
  setCurrentChannelId, addChannel, renameChannel, removeChannel,
} = channelsSlice.actions;
export {
  fetchChannelsAsync,
  createChannelAsync,
  removeChannelAsync,
  renameChannelAsync,
};
export default channelsSlice.reducer;
