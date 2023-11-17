import { configureStore } from '@reduxjs/toolkit';
import bagReducer from '@/lib/slices/bagSlice';
import bagSlice from '@/lib/slices/bagSlice';

export const store = configureStore({
  reducer: {
    bag: bagSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
