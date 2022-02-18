import * as React from "react";
import { useContext } from "react";
import { useAppSelector } from "../../hooks";
import { Stack } from "@mui/material";
import Word from "../../components/word/Word";
import { emptyLetters, letters, unusedLetters } from "./util";
import { GameWsContext } from "../../services/ws";

interface GameProps {
  sessionId: string;
}

export default function Game(props: GameProps) {
  const gameState = useAppSelector((state) => state.game);
  const gameWs = useContext(GameWsContext);

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
        onChange={(letter) => {
          if (letter.length == 0) {
            gameWs.actions.sendDeleteLetter();
          } else if (letter.length == 1) {
            gameWs.actions.sendAddLetter(letter);
          } else {
            console.error(
              "unexpected word change, expected length 0 or 1 but got",
              letter,
            );
          }
        }}
      />
    );
  }

  return (
    <div>
      <h1>
        SessionID: {props.sessionId}, Players: {gameState.players}
      </h1>
      <Stack spacing={2}>
        {[...Array(gameState.params.maxGuesses)].map(row)}
      </Stack>
      unused letters: {unusedLetters(gameState.previousGuesses)}
    </div>
  );
}
