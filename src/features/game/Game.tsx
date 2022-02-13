import * as React from "react";
import { useAppSelector } from "../../hooks";
import { Stack } from "@mui/material";
import Word from "../../components/word/Word";
import { unusedLetters } from "./util";

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
        width={gameState.params.wordLength}
      />
    );
  }

  return (
    <div>
      <Stack spacing={2}>
        {[...Array(gameState.params.maxGuesses)].map(row)}
      </Stack>
      unused letters: {unusedLetters(gameState.previousGuesses)}
    </div>
  );
}
