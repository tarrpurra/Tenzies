import { useEffect, useState } from "react";
import Dice from "./dice";

export default function Tenzin({
  Winner,
  checkWinner,
  reset,
  toggleLock,
  rollDice,
  randomNumber,
  dice,
  lockedDice,
  generateDice,
  setRandomNumber,
  timeLeft
}) {
  // Format the timeLeft to mm:ss
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 6) + 1);
  }, []);

  useEffect(() => {
    checkWinner();
  }, [dice, lockedDice, checkWinner]);

  return (
    <div
      className={`relative bg-gray-100 flex-col mb-1 w-fit h- justify-center items-center box-border border-2 border-white rounded-md h-auto drop-shadow-xl`}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex-col box-border border-2 border-border-colors bg-Text-C text-back rounded-lg w-1/6 justify-center content-center text-center h-14 ml-8 mt-11 mb-10">
          {randomNumber}
        </div>
        <h1 className="font-bold text-center text-3xl mt-11 mb-10">TenZies</h1>
        <h2 className="mr-8">Time: {formatTime(timeLeft)}</h2>
      </div>

      <h2 className="underline underline-offset-4 text-center ml-4 mr-4">
        Roll Until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </h2>

      <Dice
        generateDice={generateDice}
        toggleLock={toggleLock}
        dice={dice}
        lockedDice={lockedDice}
      />

      <div className="flex justify-center w-full mt-4 mb-5">
        <button
          type="button"
          className="bg-back border-2 border-solid border-border-colors text-Text-C rounded-xl p-3 hover:bg-mint hover:border-Text-C hover:text-one-more-Text"
          onClick={rollDice}
        >
          ROLL IT UP!!!!
        </button>
      </div>
    </div>
  );
}
