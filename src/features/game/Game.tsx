import * as React from "react";
import { ChangeEvent, useContext } from "react";
import { useAppSelector } from "../../hooks";
import { Button, Stack } from "@mui/material";
import Word from "../../components/word/Word";
import { unusedLetters } from "./util";
import { GameWsContext } from "../../services/ws";
import { emptyLetterGuess } from "../../types/game";
import * as _ from "lodash";

export default function Game() {
  const gameState = useAppSelector((state) => state.game);
  const gameWs = useContext(GameWsContext);

  // TODO: need to test this
  // useEffect(() => {
  //   return function () {
  //     gameWs.actions.disconnect();
  //   };
  // });

  function row(_value: undefined, i: number) {
    let letters = _.times(gameState.params.wordLength, emptyLetterGuess);
    if (i < gameState.previousGuesses.length) {
      letters = gameState.previousGuesses[i];
    } else if (i == gameState.previousGuesses.length) {
      letters = gameState.currentLetters;
    }

    return (
      <Word
        key={i}
        enabled={gameState.previousGuesses.length == i}
        letters={letters}
        width={gameState.params.wordLength}
        onChange={(letters) => {
          if (letters.length == 0) {
            gameWs.actions.sendDeleteLetter();
          } else if (letters.length == 1) {
            gameWs.actions.sendAddLetter(letters);
          } else {
            console.error(
              "unexpected word change, expected length 0 or 1 but got",
              letters,
            );
          }
        }}
      />
    );
  }

  function submitGuess(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    // double check this? arent they all empty strings?
    if (gameState.currentLetters.length == gameState.params.wordLength) {
      gameWs.actions.submitGuess();
    }
  }

  const unusedGuessLetters = unusedLetters(
    _.flatten(
      gameState.previousGuesses.map((letterGuesses) =>
        letterGuesses.map((lg) => lg.letter),
      ),
    ),
  );

  return (
    <div>
      <h2>Players: {gameState.players.join(", ")}</h2>
      <form onSubmit={submitGuess}>
        <Stack spacing={2}>
          {[...Array(gameState.params.maxGuesses)].map(row)}
        </Stack>
        <Button type="submit" variant="outlined">
          Submit Guess
        </Button>
      </form>
      unused letters: {unusedGuessLetters}
    </div>
  );
}
