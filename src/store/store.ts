import { combineReducers, configureStore } from '@reduxjs/toolkit';

import app from './app/slice';

import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  app,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: process.env.NODE_ENV !== 'production',
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;
