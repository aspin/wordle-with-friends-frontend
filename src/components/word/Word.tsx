import * as React from "react";
import { TextField } from "@mui/material";

interface WordProps {
  enabled: boolean;
  value: string;
}

export default function Word(props: WordProps) {
  return <TextField disabled={!props.enabled} value={props.value} />;
}
