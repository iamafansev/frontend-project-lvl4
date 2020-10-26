/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import routes from '../routes';

export const fetchChannelsWithMessagesAsync = createAsyncThunk(
  'channels/fetchChannelsWithMessages',
  async () => {
    const route = routes.channelsWithMessagesPath();
    const { data: { data } } = await axios.get(route);

    return data;
  },
);
