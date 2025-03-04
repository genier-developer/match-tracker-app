import { FC } from 'react';
import { Match } from '../../entities/match/types.ts';
import s from './match-detals.module.scss';

interface MatchDetailsProps {
  match: Match;
}

export const MatchDetails: FC<MatchDetailsProps> = ({ match }) => {
  return (
    <div className={s.matchDetails}>
      <div className={s.teamStat}>
        <div className={s.teamRow}>
          {match.homeTeam.players.map((player, index) => (
            <div key={index} className={s.playerCard}>
              <div>{player.username}</div>
              <div>Убийств: {player.kills}</div>
            </div>
          ))}
        </div>
        <div className={s.statsRow}>
          <div>Points: {match.homeTeam.points}</div>
          <div>Place: {match.homeTeam.place}</div>
          <div>TotalKill: {match.homeTeam.total_kills}</div>
        </div>
      </div>

      <div className={s.divider}></div>

      <div className={s.teamStat}>
        <div className={s.teamRow}>
          {match.awayTeam.players.map((player, index) => (
            <div key={index} className={s.playerCard}>
              <div>{player.username}</div>
              <div>Убийств: {player.kills}</div>
            </div>
          ))}
        </div>
        <div className={s.statsRow}>
          <div>Points: {match.awayTeam.points}</div>
          <div>Place: {match.awayTeam.place}</div>
          <div>TotalKill: {match.awayTeam.total_kills}</div>
        </div>
      </div>
    </div>
  );
};