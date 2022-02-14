import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Stack } from "@mui/material";
import Word from "../../components/word/Word";
import { emptyLetters, letters, unusedLetters } from "./util";
import { setLetter } from "./gameSlice";

export default function Game() {
  const gameState = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  function row(_value: undefined, i: number) {
    let text = emptyLetters(gameState.params.wordLength);
    if (i < gameState.previousGuesses.length) {
      text = letters(gameState.previousGuesses[i]);
    } else if (i == gameState.previousGuesses.length) {
      text = gameState.currentLetters;
    }

    return (
      <Word
        key={i}
        enabled={gameState.previousGuesses.length == i}
        value={text}
        width={gameState.params.wordLength}
        onChange={(index, letter) => {
          dispatch(setLetter({ index, letter }));
        }}
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
