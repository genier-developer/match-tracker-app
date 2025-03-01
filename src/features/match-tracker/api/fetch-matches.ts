import {instance} from './../../../shared/api/instance'
import {Match} from "../../../entities/match/types.ts";

export const fetchMatches = async (): Promise<Match[]> => {
  try {
    const { data } = await instance.get<Match[]>('/fronttemp');
    return data;
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
};

