import * as React from "react";
import { useAppSelector } from "../../hooks";
import { Stack } from "@mui/material";

export function Game() {
  const gameState = useAppSelector((state) => state.game);

  function row(i: number) {}

  return <Stack>{[...Array(gameState.params.maxGuesses).map(row)]}</Stack>;
}

