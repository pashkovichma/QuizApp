import { useState, useEffect } from 'react';
import { TimerProps } from './timer.interface';

function Timer({ time, onTimeUp }: TimerProps) {
  const [timer, setTimer] = useState(time);

  useEffect(() => {
    if (timer > 0) {
      const timerInterval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    } else {
      onTimeUp();
    }
  }, [timer, onTimeUp]);

  return (
    <div className="timer">
      Timer: {timer}s
    </div>
  );
}

export default Timer;