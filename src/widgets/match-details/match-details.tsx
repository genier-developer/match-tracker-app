import { FC } from 'react';
import { Match } from '../../entities/match/types.ts';
import s from './match-details.module.scss';

interface MatchDetailsProps {
  match: Match;
}

export const MatchDetails: FC<MatchDetailsProps> = ({ match }) => {
  return (
    <div className={s.matchDetails}>
      <div className={s.teamsContainer}>
        <div className={s.teamColumn}>
          {/*<h3 className={s.teamName}>{match.homeTeam.name}</h3>*/}
          <div className={s.teamRow}>
            {match.homeTeam.players.map((player, index) => (
              <div key={index} className={s.playerCard}>
                <div className={s.playerName}>{player.username}</div>
                <div className={s.playerKills}>Убийств: {player.kills}</div>
              </div>
            ))}
          </div>
          <div className={s.statsRow}>
            <div>Points: {match.homeTeam.points}</div>
            <div>Place: {match.homeTeam.place}</div>
            <div>TotalKill: {match.homeTeam.total_kills}</div>
          </div>
        </div>

        <div className={s.teamColumn}>
          <div className={s.teamRow}>
            {match.awayTeam.players.map((player, index) => (
              <div key={index} className={s.playerCard}>
                <div className={s.playerName}>{player.username}</div>
                <div className={s.playerKills}>Убийств: {player.kills}</div>
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
    </div>
  );
};