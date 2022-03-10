import * as React from "react";
import { ChangeEvent, useEffect } from "react";
import { TextField } from "@mui/material";
import { lastLetter } from "../../features/game/util";
import { GameGuessLetterState } from "../../types/game";

interface LetterProps {
  value: string;
  valid: GameGuessLetterState;
  enabled: boolean;
  focus: boolean;
  onChange: (str) => void;
}

export default function Letter(props: LetterProps) {
  function onChange(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    props.onChange(lastLetter(e.target.value));
  }

  // TODO: use MUI colors https://mui.com/customization/color/
  let borderColor = "grey";
  switch (props.valid) {
    case GameGuessLetterState.Correct:
      borderColor = "green";
      break;
    case GameGuessLetterState.Incorrect:
      borderColor = "red";
      break;
    case GameGuessLetterState.Partial:
      borderColor = "yellow";
      break;
  }

  let inputRef;
  const tf = (
    <TextField
      value={props.value.toUpperCase()}
      disabled={!props.enabled}
      inputRef={(e) => (inputRef = e)}
      onChange={onChange}
      sx={{
        "& .MuiOutlinedInput-root.Mui-disabled": {
          "& fieldset": {
            borderColor,
          },
        },
      }}
    />
  );

  // force element to be focused if it's the next available
  useEffect(() => {
    if (props.focus) {
      inputRef.focus();
    }
  });

  return tf;
}
