/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { isOpened: false, type: null, data: null },
  reducers: {
    openModal: (state, { payload: { type, data } }) => {
      state.isOpened = true;
      state.type = type;
      state.data = data ?? null;
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.type = null;
      state.data = null;
    },
  },
});

export default modalSlice;
