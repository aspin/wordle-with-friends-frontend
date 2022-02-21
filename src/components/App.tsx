import * as React from "react";
import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";
import Game from "./../features/game/Game";
import { Container } from "@mui/material";
import GameWsProvider from "../services/ws";
import { useNewSessionQuery } from "../services/session";

function App() {
  const { data, isLoading } = useNewSessionQuery();

  let content;
  if (isLoading) {
    content = <h1>loading...</h1>;
  } else {
    content = (
      <GameWsProvider sessionId={data.id}>
        <Game sessionId={data.id} />
      </GameWsProvider>
    );
  }

  return <Container fixed>{content}</Container>;
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
