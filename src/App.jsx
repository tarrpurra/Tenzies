import "./App.css";
import Tenzin from "./components/Tenzin";
import { useWindowSize } from "@react-hook/window-size";
import Confetti from 'react-confetti'
import { useState, useEffect } from "react";

function App() {
  function generateDice() {
    return Array.from({ length: 10 }, () => Math.floor(Math.random() * 6) + 1);
  }

  const [dice, setDice] = useState(generateDice());
  const [lockedDice, setLockedDice] = useState(Array(10).fill(false));
  const [randomNumber, setRandomNumber] = useState(0);
  const [Winner, SetWinner] = useState(null); // Use null to differentiate between not started and win/lose states
  const [timeLeft, setTimeLeft] = useState(120); // Start with 2 minutes
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const {width,height}=useWindowSize()

  function toggleLock(index) {
    setLockedDice((prevLocks) =>
      prevLocks.map((isLocked, i) => (i === index ? !isLocked : isLocked))
    ); 
  }

  function rollDice() {
    setIsTimerActive(true)
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount % 3 === 0) {
        // Unlock one locked die every third click
        setLockedDice((prevLocks) => {
          const lockedIndices = prevLocks
            .map((locked, index) => (locked ? index : null))
            .filter((index) => index !== null);
          if (lockedIndices.length > 0) {
            const indexToUnlock =
              lockedIndices[Math.floor(Math.random() * lockedIndices.length)];
            return prevLocks.map((locked, index) =>
              index === indexToUnlock ? false : locked
            );
          }
          return prevLocks;
        });
      }
      return newCount;
    });

    setDice((prevDice) =>
      prevDice.map((die, index) =>
        lockedDice[index] ? die : Math.floor(Math.random() * 6) + 1
      )
    );
  }

  function checkWinner() {
    const allLocked = lockedDice.every((isLocked) => isLocked);
    const allMatch = dice.every((die) => die === randomNumber);

    if (allLocked && allMatch) {
      SetWinner(true); // Declare a winner
      setIsTimerActive(false); // Stop the timer on win
    }
  }

  function reset() {
    SetWinner(null); // Reset winner status to null
    setDice(generateDice());
    setLockedDice(Array(10).fill(false));
    setRandomNumber(Math.floor(Math.random() * 6) + 1);
    setTimeLeft(120); // Reset timer
    setIsTimerActive(true); // Restart timer
  }

  useEffect(() => {
    if (isTimerActive) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerActive(false); // Stop the timer
            SetWinner(false); // Automatically lose if time runs out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [isTimerActive]);

  return (
    <div className="relative h-screen flex items-center justify-center bg-main-color">
      {/* Game board with conditional blur */}
      <div className={`relative w-full h-full flex items-center justify-center transition-all duration-300 ${Winner === null ? 'blur-none' : Winner ? 'blur-2xl' : 'blur-none'}`}>
        <Tenzin 
          Winner={Winner}
          checkWinner={checkWinner}
          reset={reset}
          toggleLock={toggleLock}
          rollDice={rollDice}
          randomNumber={randomNumber}
          dice={dice}
          lockedDice={lockedDice}
          generateDice={generateDice}
          setRandomNumber={setRandomNumber}
          timeLeft={timeLeft}
        />
      </div>

      {/* Winning or Losing modal positioned on top of the game */}
      {Winner !== null && (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-70 z-50">
          {Winner ? (
            <>

              <Confetti width={width} height={height}/>
              <h1 className="text-green-600 font-bold text-5xl mb-4">You Win!</h1>
              <h2 className="text-white text-2xl">Want to play again?</h2>
              
            </>
          ) : (
            <>
              <h1 className="text-red-600 font-bold text-5xl mb-4">You Lose!</h1>
              <h2 className="text-white text-2xl">Want to try again?</h2>
            </>
          )}
          <button
            className="bg-green-500 text-white p-3 mt-4 rounded-lg hover:bg-green-700"
            onClick={reset}
          >
            !!Reset!!
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
