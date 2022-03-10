import * as React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import Session from "../session/Session";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
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
    if (sessionId && sessionIdInputRef) {
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

  function content() {
    if (isLoading || !ready) {
      return (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={3}>
            <Box component="form" onSubmit={connectSession} autoComplete="off">
              <Stack spacing={2}>
                <TextField
                  label="Username"
                  id="username"
                  sx={{
                    width: "100%",
                  }}
                />
                <TextField
                  label="Session ID"
                  id="session-id"
                  inputRef={(e) => (sessionIdInputRef = e)}
                  sx={{
                    width: "100%",
                  }}
                />
                <Grid container>
                  <Grid item xs={6} sx={{ pr: 1 }}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ width: "100%" }}
                    >
                      Connect
                    </Button>
                  </Grid>
                  <Grid item xs={6} sx={{ pl: 1 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={createSession}
                      sx={{ width: "100%" }}
                    >
                      Create New
                    </Button>
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      );
    } else {
      return <Session loading={false} sessionId={sessionId} />;
    }
  }

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <Typography variant="h1" sx={{ textAlign: "center" }}>
          fwordle
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {content()}
      </Grid>
    </Grid>
  );
}
