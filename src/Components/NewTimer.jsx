import React, { useState, useEffect, useRef } from "react";

export const CountdownTimer = () => {
  const [secondsRemaining, setSecondsRemaining] = useState(180);
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("Stopped");
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  // const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60

  const handleStart = () => {
    setStatus("Started");
    setShow(false);
  };
  const handleStop = () => {
    setStatus("Stopped");
    
  };
  const handleReset = () => {
    window.location.reload()
    setStatus("Reset");
    setShow(true);
    setSecondsRemaining(180);
  };
  const twoDigits = (num) => String(num).padStart(2, "0");
  const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setStatus("Stopped");
      }
    },
    status === "Started" ? 1000 : null
  );

  return (
    <div>
      
      <h1>React Countdown</h1>
      <input
        type="number"
        defaultValue={3}
        
        onChange={(e) => setSecondsRemaining(e.target.value * 60)}
      />
      <br />
      {
      show?
      (
      <button onClick={handleStart} type="button">
        Start
      </button>
      )
      :
      (<>
      <button onClick={handleStart} type="button">
        Continiue
      </button>
      &nbsp;
      <button onClick={handleStop} type="button">
        Stop
      </button>
      &nbsp;
      <button onClick={handleReset} type="button">
        Reset
      </button>
      </>
      )
      }
      <div style={{ padding: 20 }}>
        <h1>{twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}</h1>
      </div>
      <div style={{color:"#ccc",backgroundColor:"black", width:"150px", marginLeft:"120px"}}> Status: {status}</div>
      
    </div>
  );
};
