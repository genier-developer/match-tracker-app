import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store.ts';
import { loadMatches } from '../../features/match-tracker/model/matches-slice.ts';
import { MatchList } from '../../features/match-tracker/ui/match-list';
import s from './match-tracker.module.scss';
import { useDispatch } from 'react-redux';
import { Button } from "../../shared/ui/button";
import { ErrorMessage } from '../../shared/ui/error-message';

const useAppDispatch = () => useDispatch<AppDispatch>();

export const MatchTracker: FC = () => {
  const dispatch = useAppDispatch();
  const { matches, loading, error } = useSelector((state: RootState) => state.matches);

  useEffect(() => {
    dispatch(loadMatches());
  }, [dispatch]);

  return (
    <div className={s.matchTracker}>
      <div className={s.header}>
        <h1>Match Tracker</h1>
        <div className={s.controls}>
          {error && <ErrorMessage message={error} />}
          <Button
            onClick={() => dispatch(loadMatches())}
            loading={loading}
            fullWidth={false}
          >
            Обновить
          </Button>
        </div>
      </div>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <MatchList matches={matches} />
      )}
    </div>
  );
};