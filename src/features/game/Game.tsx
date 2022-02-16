import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Stack } from "@mui/material";
import Word from "../../components/word/Word";
import { emptyLetters, letters, unusedLetters } from "./util";
import { setLetter } from "./gameSlice";
import { useNewSessionQuery } from "../../services/session";

export default function Game() {
  const gameState = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const { data, isLoading } = useNewSessionQuery()

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

  let header = <h1>loading...</h1>
  if (!isLoading) {
    header = <h1>SessionID: {data.id}, Players: {data.players}</h1>
  }

  return (
    <div>
      {header}
      <Stack spacing={2}>
        {[...Array(gameState.params.maxGuesses)].map(row)}
      </Stack>
      unused letters: {unusedLetters(gameState.previousGuesses)}
    </div>
  );
}
