import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { list: [], currentChannelId: null },
  reducers: {
    setChannels: (state, { payload }) => ({ ...state, list: payload }),
    setCurrentChannelId: (state, { payload }) => ({ ...state, currentChannelId: payload }),
  },
  extraReducers: {},
});

export default channelsSlice;
