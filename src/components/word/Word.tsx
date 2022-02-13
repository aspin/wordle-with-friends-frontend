import * as React from "react";
import Letter, { Validity } from "../letter/Letter";
import { Stack } from "@mui/material";

interface WordProps {
  enabled: boolean;
  value: string;
  width: number;
}

export default function Word(props: WordProps) {
  function letter(_value: undefined, i: number) {
    return (
      <Letter
        enabled={props.enabled}
        value={props.value[i] || ""}
        valid={Validity.Unknown}
      />
    );
  }

  return (
    <Stack direction="row" spacing={2}>
      {[...Array(props.width)].map(letter)}
    </Stack>
  );
}
