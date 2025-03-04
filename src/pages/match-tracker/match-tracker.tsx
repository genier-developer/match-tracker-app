import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import { RootState, AppDispatch } from '../../app/store.ts';
import { loadMatches } from '../../features/match-tracker/api';
import { MatchList } from '../../features/match-tracker/ui/match-list';
import s from './match-tracker.module.scss';
import { Button } from "../../shared/ui/button";
import { ErrorMessage } from "../../widgets/error-message";

const useAppDispatch = () => useDispatch<AppDispatch>();
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const MatchTracker: FC = () => {
  const dispatch = useAppDispatch();
  const { matches, error } = useSelector((state: RootState) => state.matches);
  const [socketError, setSocketError] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!SOCKET_URL) {
      setSocketError('URL сокета не определен');
      return;
    }

    try {
      const newSocket = io(SOCKET_URL, {
        transports: ['websocket'],
        path: '/socket.io',
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000,
        autoConnect: true
      });

      newSocket.on('connect', () => {
        console.log('Connected to WebSocket');
        setSocketError(null);
      });

      newSocket.on('match-update', (data) => {
        console.log('Получены данные:', data);
        dispatch(loadMatches());
      });

      newSocket.on('connect_error', (err) => {
        setSocketError('Ошибка подключения к WebSocket');
        console.error('Socket error:', err);
      });

      setSocket(newSocket);

      return () => {
        if (newSocket.connected) {
          newSocket.disconnect();
        }
      };
    } catch (error) {
      console.error('Error initializing socket:', error);
      setSocketError('Ошибка инициализации WebSocket');
    }
  }, [dispatch]);

  // Резервный вариант с периодическим обновлением, если сокет не работает
  useEffect(() => {
    if (socketError) {
      console.log('Используем резервный вариант с периодическим HTTP обновлением');

      dispatch(loadMatches());
      const intervalId = setInterval(() => {
        dispatch(loadMatches());
      }, 3000);
      
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [socketError, dispatch]);

  useEffect(() => {
    dispatch(loadMatches());
  }, [dispatch]);

  const handleRefresh = () => {
    setSocketError(null);
    socket?.emit('request-matches');
  };

  return (
    <div className={s.matchTracker}>
      <div className={s.header}>
        <h1>Match Tracker</h1>
        <div className={s.controls}>
          {(error || socketError) && <ErrorMessage message={error || socketError || ''} />}
          <Button onClick={handleRefresh} fullWidth={false}>
            Обновить
          </Button>
        </div>
      </div>

      <MatchList matches={matches} />
    </div>
  );
};
