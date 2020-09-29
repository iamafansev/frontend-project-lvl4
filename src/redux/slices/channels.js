import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import routes from '../../routes';

export const createChannel = createAsyncThunk(
  'channels/createChannel',
  async (name) => {
    const route = routes.channelsPath();
    const attributes = { name };
    const { data: { data } } = await axios.post(route, { data: { attributes } });
    return data;
  },
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (id) => {
    const route = routes.channelPath(id);
    const { data: { data } } = await axios.delete(route);
    return data;
  },
);

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, name }) => {
    const route = routes.channelPath(id);
    const attributes = { name };
    const { data: { data } } = await axios.patch(route, { data: { attributes } });
    return data;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { list: [], currentChannelId: null },
  reducers: {
    setChannels: (state, { payload }) => ({ ...state, list: payload }),
    setCurrentChannelId: (state, { payload }) => ({ ...state, currentChannelId: payload }),
    addChannel: (state, { payload }) => ({ ...state, list: [...state.list, payload] }),
    renameChannel: (state, { payload: { id, name } }) => {
      const newList = state.list.reduce((acc, channel) => {
        const newChannel = channel.id === id
          ? { ...channel, name }
          : channel;

        return [...acc, newChannel];
      }, []);

      return { ...state, list: newList };
    },
  },
});

export default channelsSlice;
