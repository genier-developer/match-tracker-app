import { instance } from './../../../shared/api/instance';
import { Match } from '../../../entities/match/types.ts';

export const fetchMatches = async (): Promise<Match[]> => {
  const { data } = await instance.get<{ data: { matches: Match[] } }>('/fronttemp');
  return data.data.matches;
};