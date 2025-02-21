import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './slices/messagesSlice';
import errorReducer from './slices/errorSlice';
import loadingReducer from './slices/loadingSlice';
import languageReducer from './slices/languageSlice';

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    error: errorReducer,
    loading: loadingReducer,
    language: languageReducer,
  },
});

export default store;