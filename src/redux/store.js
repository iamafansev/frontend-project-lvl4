import { configureStore } from '@reduxjs/toolkit';

import counterSlice from './slices/counter';

const reducer = {
  [counterSlice.name]: counterSlice.reducer,
};

const store = configureStore({ reducer });

export default store;
