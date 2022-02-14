import * as React from "react";
import Letter, { Validity } from "../letter/Letter";
import { Stack } from "@mui/material";

interface WordProps {
  enabled: boolean;
  value: string[];
  width: number;
  onChange: (i: number, value: string) => void;
}

export default function Word(props: WordProps) {
  function letter(_value: undefined, i: number) {
    // set focus on the first enabled empty spot
    const focus =
      props.enabled &&
      props.value[i] == " " &&
      (i == 0 || props.value[i - 1] != " ");

    return (
      <Letter
        key={i}
        enabled={props.enabled}
        value={props.value[i]}
        valid={Validity.Unknown}
        focus={focus}
        onChange={(e) => props.onChange(i, e.target.value)}
      />
    );
  }

  return (
    <Stack direction="row" spacing={2}>
      {[...Array(props.width)].map(letter)}
    </Stack>
  );
}
