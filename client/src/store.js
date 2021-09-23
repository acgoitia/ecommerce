import { configureStore } from '@reduxjs/toolkit';
import itemBrowserReducer from './components/itemBrowser/itemBrowserSlice';
import loginReducer from './components/login/loginSlice';

export const store = configureStore({
  reducer: {
    itemBrowser: itemBrowserReducer,
    login: loginReducer
  },
});
