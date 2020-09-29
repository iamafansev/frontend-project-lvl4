import { createSlice } from '@reduxjs/toolkit';

const initialState = { isOpened: false, type: null, data: null };

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload: { type, data } }) => (
      { isOpened: true, type, data: data || null }
    ),
    closeModal: () => initialState,
  },
});

export default modalSlice;
