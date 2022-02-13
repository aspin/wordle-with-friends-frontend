import * as React from "react";
import { useAppSelector } from "../../hooks";
import { Stack, TextField } from "@mui/material";
import Word from "../../components/word/Word";

export default function Game() {
  const gameState = useAppSelector((state) => state.game);

  function row(_value: undefined, i: number) {
    let previousGuess = "";
    if (i < gameState.previousGuesses.length) {
      previousGuess = gameState.previousGuesses[i];
    }

    return (
      <Word
        enabled={gameState.previousGuesses.length == i}
        value={previousGuess}
      />
    );
  }

  return (
    <div>
      <h2>
        guesses {gameState.params.maxGuesses} length{" "}
        {gameState.params.wordLength}
      </h2>
      <Stack spacing={2}>
        {[...Array(gameState.params.maxGuesses)].map(row)}
      </Stack>
    </div>
  );
}
