import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Match } from '../../../entities/match/types';
import {loadMatches} from "../api";

interface MatchesState {
  matches: Match[];
  loading: boolean;
  error: string | null;
}

const initialState: MatchesState = {
  matches: [],
  loading: false,
  error: null,
};

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    updateMatchesFromSocket: (state, action: PayloadAction<Match[]>) => {
      state.matches = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action.payload;
      })
      .addCase(loadMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка: не удалось загрузить информацию';
      });
  },
});

export const { updateMatchesFromSocket } = matchesSlice.actions;
export default matchesSlice.reducer;