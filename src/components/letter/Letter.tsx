import * as React from "react";
import { ChangeEvent, useEffect } from "react";
import { TextField } from "@mui/material";
import { lastLetter } from "../../features/game/util";

interface LetterProps {
  value: string;
  valid: Validity;
  enabled: boolean;
  focus: boolean;
  onChange: (str) => void;
}

export enum Validity {
  Unknown,
  Valid,
  Invalid,
}

export default function Letter(props: LetterProps) {
  function onChange(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    props.onChange(lastLetter(e.target.value));
  }

  let inputRef;
  const tf = (
    <TextField
      value={props.value.toUpperCase()}
      disabled={!props.enabled}
      inputRef={(e) => (inputRef = e)}
      onChange={onChange}
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
