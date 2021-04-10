import React, { useState, useEffect } from 'react';
import { Subject, interval } from 'rxjs';
import { takeUntil, bufferTime } from 'rxjs/operators';

import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    const sub$ = new Subject();
    interval(1000)
      .pipe(takeUntil(sub$))
      .subscribe(() => {
        if (timerOn) {
          setTime((prev) => prev + 1);
        }
      });
    return () => {
      sub$.next();
      sub$.complete();
    };
  }, [timerOn]);

  const start_stop = () => {
    setTimerOn((prev) => !prev);
    if (timerOn) {
      setTime(0);
    }
  };

  const wait = () => {
    if (time !== 0) {
      setTimerOn(false);
    }
  };

  const reset = () => {
    setTime(0);
    setTimerOn(true);
  };

  return (
    <div className="App">
      <div>
        <span>{('0' + Math.floor((time / 3600) % 100)).slice(-2)}:</span>
        <span>{('0' + Math.floor((time / 60) % 60)).slice(-2)}:</span>
        <span>{('0' + Math.floor(time % 60)).slice(-2)}</span>
      </div>
      <div>
        <button type="button" className="btn btn-light" onClick={start_stop}>
          Start/Stop
        </button>
        <button type="button" className="btn btn-light" onDoubleClick={wait}>
          Wait
        </button>
        <button type="button" className="btn btn-dark" onClick={reset} onCl>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
