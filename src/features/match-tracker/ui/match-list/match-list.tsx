import { Match } from '../../../../entities/match/types.ts';
import { FC } from 'react';
import s from './match-list.module.scss';
import { StatusCard } from "../../../../shared/ui/status-card";
import Icon from './../../../../shared/assets/icons/icon.svg';

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
        <div key={`${match.title}-${match.time}-${match.homeTeam.name}-${match.awayTeam.name}`} className={s.matchItem}>
          <div className={s.scoreContainer}>
            <div className={s.teamContainer}>
              <img src={Icon} alt="Team Icon" className={s.icon} />
              <div className={s.team}>{match.homeTeam.name}</div>
            </div>

            <div className={s.scoreAndStatus}>
              <div
                // className={`${s.score} ${
                //   match.status === 'Live' ? s.live : s.finished
                // }`}
              >
                {match.homeScore} : {match.awayScore}
              </div>
              <div className={s.statusContainer}>
                <StatusCard
                  variant={
                    match.status === 'Live'
                      ? 'green'
                      : match.status === 'Finished'
                        ? 'red'
                        : match.status === 'Ongoing'
                        ? 'orange'
                        : 'grey'

                  }
                  title={match.status}
                />
              </div>
            </div>

            <div className={s.teamContainer}>
              <div className={s.team}>{match.awayTeam.name}</div>
              <img src={Icon} alt="Team Icon" className={s.icon} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};