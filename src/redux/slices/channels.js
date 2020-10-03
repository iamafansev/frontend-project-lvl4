import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { list: [], currentChannelId: null },
  reducers: {
    setCurrentChannelId: (state, { payload: currentChannelId }) => (
      { ...state, currentChannelId }
    ),
    addChannel: (state, { payload: channel }) => ({
      ...state,
      list: [...state.list, channel],
    }),
    renameChannel: (state, { payload: { id, name } }) => {
      const newList = state.list.map((channel) => (
        channel.id === id ? { ...channel, name } : channel
      ));

      return { ...state, list: newList };
    },
    removeChannel: (state, { payload: id }) => (
      { ...state, list: state.list.filter((channel) => channel.id !== id) }
    ),
  },
});

export default channelsSlice;
