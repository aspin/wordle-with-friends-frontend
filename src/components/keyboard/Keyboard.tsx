import * as React from "react";
import { GameGuessLetters, GameGuessLetterState } from "../../types/game";
import { Button, Stack } from "@mui/material";
import { letterStates } from "../../features/game/util";

interface KeyboardProps {
  guesses: GameGuessLetters[];
}

const qwerty = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const stateColorMapping = {
  [GameGuessLetterState.Unknown]: "primary",
  [GameGuessLetterState.Correct]: "success",
  [GameGuessLetterState.Partial]: "warning",
  [GameGuessLetterState.Incorrect]: "error",
};

export default function Keyboard(props: KeyboardProps) {
  const ls = letterStates(props.guesses);

  function row(letters: string[], i: number) {
    return (
      <Stack
        key={i}
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        {letters.map(button)}
      </Stack>
    );
  }

  function button(letter: string) {
    let variant = "outlined";
    if (ls[letter] != GameGuessLetterState.Unknown) {
      variant = "contained";
    }
    return (
      <Button
        key={letter}
        variant={variant}
        color={stateColorMapping[ls[letter]]}
      >
        {letter}
      </Button>
    );
  }

  return <Stack spacing={1}>{qwerty.map(row)}</Stack>;
}
