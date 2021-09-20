import { configureStore } from '@reduxjs/toolkit';
import itemBrowserReducer from './components/itemBrowser/itemBrowserSlice';

export const store = configureStore({
  reducer: {
    itemBrowser: itemBrowserReducer
  },
});
