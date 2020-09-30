import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import keyBy from 'lodash/keyBy';
import omit from 'lodash/omit';
import without from 'lodash/without';

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
  initialState: { byId: {}, ids: [], currentChannelId: null },
  reducers: {
    setChannels: (state, { payload }) => ({
      ...state,
      byId: keyBy(payload, 'id'),
      ids: payload.map(({ id }) => id),
    }),
    setCurrentChannelId: (state, { payload }) => ({ ...state, currentChannelId: payload }),
    addChannel: (state, { payload }) => {
      const { id } = payload;
      return {
        ...state,
        byId: { ...state.byId, [id]: payload },
        ids: [...state.ids, id],
      };
    },
    renameChannel: (state, { payload: { id, name } }) => {
      const { byId } = state;
      const currentChannel = state.byId[id];

      return { ...state, byId: { ...byId, [id]: { ...currentChannel, name } } };
    },
    removeChannel: ({ byId, ids, currentChannelId }, { payload: { id } }) => {
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
