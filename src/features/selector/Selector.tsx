import * as React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import Session from "../session/Session";
import { Button, TextField } from "@mui/material";
import { setSessionId } from "./selectorSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNewSessionQuery } from "../../services/session";

export default function Selector() {
  // generate indicates if a new session ID should be generated
  const [generate, setGenerate] = useState<boolean>(false);

  // ready indicates if the game is ready to be rendered (e.g. any session ID has been selected)
  const [ready, setReady] = useState<boolean>(false);

  let sessionIdInputRef;

  // prefill value if set from generation (but component should not be controlled)
  const selectorState = useAppSelector((state) => state.selector);
  const dispatch = useAppDispatch();

  const sessionId = selectorState.sessionId;

  const skipQuery = !(generate && ready);
  const { data, isLoading } = useNewSessionQuery(undefined, {
    skip: skipQuery,
  });

  if (data) {
    dispatch(setSessionId(data.id));
    setGenerate(false);
  }

  useEffect(() => {
    if (sessionId) {
      sessionIdInputRef.value = sessionId;
    }
  });

  function connectSession(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setReady(true);
    setGenerate(false);
    dispatch(setSessionId(e.target["session-id"].value));
  }

  function createSession() {
    setReady(true);
    setGenerate(true);
  }

  return (
    <div>
      <h1>Wordle With Friends</h1>
      <form onSubmit={connectSession}>
        <TextField
          label="Session ID"
          id="session-id"
          inputRef={(e) => (sessionIdInputRef = e)}
          defaultValue={" "} // default value to keep label floating
        />
        <Button type="submit">Connect</Button>
        <Button onClick={createSession}>Create New</Button>
      </form>
      <Session loading={isLoading || !ready} sessionId={sessionId} />
    </div>
  );
}
