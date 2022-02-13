import * as React from "react";
import { TextField } from "@mui/material";

interface LetterProps {
  value: string;
  valid: Validity;
  enabled: boolean;
}

export enum Validity {
  Unknown,
  Valid,
  Invalid,
}

export default function Letter(props: LetterProps) {
  return <TextField value={props.value} disabled={!props.enabled} />;
}
