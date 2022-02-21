import * as React from "react";
import Letter, { Validity } from "../letter/Letter";
import { Stack } from "@mui/material";

interface WordProps {
  enabled: boolean;
  value: string[];
  width: number;
  onChange: (letter: string) => void;
}

export default function Word(props: WordProps) {
  function letter(_value: undefined, i: number) {
    // set focus on the first enabled empty spot
    let focus =
      props.enabled &&
      props.value[i] == " " &&
      (i == 0 || props.value[i - 1] != " ");

    // if last letter and is filled (e.g. all letters filled), keep focused
    if (i == props.value.length - 1 && props.value[i] != " ") {
      focus = props.enabled;
    }

    return (
      <Letter
        key={i}
        enabled={focus}
        value={props.value[i]}
        valid={Validity.Unknown}
        focus={focus}
        onChange={(letter) => props.onChange(letter)}
      />
    );
  }

  return (
    <Stack direction="row" spacing={2}>
      {[...Array(props.width)].map(letter)}
    </Stack>
  );
}
