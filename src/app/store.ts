import { configureStore } from '@reduxjs/toolkit';
import matchesReducer from './../features/match-tracker/model/matches-slice'

export const store = configureStore({
  reducer: {
    matches: matchesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;