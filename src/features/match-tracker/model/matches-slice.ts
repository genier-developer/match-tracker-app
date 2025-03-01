import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMatches } from '../api';
import { Match } from '../../../entities/match/types';

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

export const loadMatches = createAsyncThunk<
  Match[],
  void,
  { rejectValue: string }
>('matches/loadMatches', async (_, { rejectWithValue }) => {
  try {
    return await fetchMatches();
  } catch (error) {
    return rejectWithValue('Ошибка: не удалось загрузить информацию');
  }
});

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {},
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
      .addCase(loadMatches.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка: не удалось загрузить информацию';
      });
  },
});

export default matchesSlice.reducer;