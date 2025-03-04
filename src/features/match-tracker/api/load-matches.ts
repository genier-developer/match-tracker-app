import {createAsyncThunk} from "@reduxjs/toolkit";
import {Match} from "../../../entities/match/types.ts";
import {fetchMatches} from "./fetch-matches.ts";

export const loadMatches = createAsyncThunk<
  Match[],
  void,
  { rejectValue: string }
>('matches/loadMatches', async (_, { rejectWithValue }) => {
  try {
    return await fetchMatches();
  } catch {
    return rejectWithValue('Ошибка: не удалось загрузить информацию');
  }
});