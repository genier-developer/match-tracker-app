import { instance } from './../../../shared/api/instance';
import { Match } from '../../../entities/match/types.ts';

export const fetchMatches = async (): Promise<Match[]> => {
  try {
    const { data } = await instance.get<{ data: { matches: Match[] } }>('/fronttemp');
    return data.data.matches;
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
};