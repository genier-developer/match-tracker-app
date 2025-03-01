import { Match } from '../../../../entities/match/types.ts';
import { FC } from 'react';
import s from './match-list.module.scss';

interface MatchListProps {
  matches: Match[];
}

export const MatchList: FC<MatchListProps> = ({ matches }) => {
  if (matches.length === 0) {
    return <p>Нет доступных матчей</p>;
  }

  return (
    <div className={s.matchList}>
      {matches.map((match) => (
        <div key={match.title} className={s.matchItem}>
          <div className={s.team}>{match.homeTeam.name}</div>
          <div
            className={`${s.score} ${
              match.status === 'Live' ? s.live : s.finished
            }`}
          >
            {match.homeScore} : {match.awayScore}
          </div>
          <div className={s.team}>{match.awayTeam.name}</div>
        </div>
      ))}
    </div>
  );
};