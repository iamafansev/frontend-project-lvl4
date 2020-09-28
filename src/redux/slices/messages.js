import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { list: [] },
  reducers: {
    setMessages: (state, { payload }) => ({ ...state, list: payload }),
    addMessage: (state, { payload }) => ({ ...state, list: [...state.list, payload] }),
  },
});

export default messagesSlice;
