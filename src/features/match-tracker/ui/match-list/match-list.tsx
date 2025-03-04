import { Match } from '../../../../entities/match/types.ts';
import { FC, useState } from 'react';
import s from './match-list.module.scss';
import { StatusCard } from "../../../../shared/ui/status-card";
import ArrowIcon from './../../../../shared/assets/icons/arrow.svg';
import TeamIcon from './../../../../shared/assets/icons/icon.svg'
import { MatchDetails } from '../../../../widgets/match-details';

interface MatchListProps {
  matches: Match[];
}

export const MatchList: FC<MatchListProps> = ({ matches }) => {
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);

  if (matches.length === 0) {
    return <p>Нет доступных матчей</p>;
  }

  const toggleMatchDetails = (matchId: string) => {
    if (expandedMatchId === matchId) {
      setExpandedMatchId(null);
    } else {
      setExpandedMatchId(matchId);
    }
  };

  return (
    <div className={s.matchList}>
      {matches.map((match) => {
        const matchId = `${match.title}-${match.time}-${match.homeTeam.name}-${match.awayTeam.name}`;
        const isExpanded = expandedMatchId === matchId;
        
        return (
          <div key={matchId} className={s.matchItem}>
            <div className={s.scoreContainer}>
              <div className={s.teamContainer}>
                <img src={TeamIcon} alt="Team Icon" />
                <div className={s.team}>{match.homeTeam.name}</div>
              </div>

              <div className={s.scoreAndStatus}>
                <div className={s.score}>
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
                <img src={TeamIcon} alt="Team Icon" />
              </div>
              
              <div 
                className={s.arrowContainer}
                onClick={() => toggleMatchDetails(matchId)}
              >
                <img 
                  src={ArrowIcon} 
                  alt="Arrow Icon" 
                  className={`${s.icon} ${isExpanded ? s.rotated : ''}`} 
                />
              </div>
            </div>

            {isExpanded && (
              <div className={s.matchDetailsContainer}>
                <MatchDetails match={match} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};