import * as React from "react";
import { useEffect } from "react";
import { TextField } from "@mui/material";

interface LetterProps {
  value: string;
  valid: Validity;
  enabled: boolean;
  focus: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export enum Validity {
  Unknown,
  Valid,
  Invalid,
}

export default function Letter(props: LetterProps) {
  let inputRef;
  const tf = (
    <TextField
      value={props.value.toUpperCase()}
      disabled={!props.enabled}
      inputRef={(e) => (inputRef = e)}
      onChange={props.onChange}
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
