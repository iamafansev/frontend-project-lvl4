import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import keyBy from 'lodash/keyBy';
import omit from 'lodash/omit';
import without from 'lodash/without';

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
  initialState: { byId: {}, ids: [], currentChannelId: null },
  reducers: {
    setChannels: (state, { payload: channels }) => ({
      ...state,
      byId: keyBy(channels, 'id'),
      ids: channels.map(({ id }) => id),
    }),
    setCurrentChannelId: (state, { payload: currentChannelId }) => (
      { ...state, currentChannelId }
    ),
    addChannel: (state, { payload }) => {
      const { data: { attributes } } = payload;
      const { id } = attributes;

      return {
        ...state,
        byId: { ...state.byId, [id]: attributes },
        ids: [...state.ids, id],
      };
    },
    renameChannel: (state, { payload }) => {
      const { byId } = state;
      const { data: { attributes } } = payload;
      const { id, name } = attributes;

      const currentChannel = state.byId[id];

      return { ...state, byId: { ...byId, [id]: { ...currentChannel, name } } };
    },
    removeChannel: (state, { payload }) => {
      const { byId, ids, currentChannelId } = state;
      const { data: { id } } = payload;
      const newCurrentChannelId = id === currentChannelId ? ids[0] : currentChannelId;

      return {
        ids: without(ids, id),
        byId: omit(byId, id),
        currentChannelId: newCurrentChannelId,
      };
    },
  },
});

export default channelsSlice;
