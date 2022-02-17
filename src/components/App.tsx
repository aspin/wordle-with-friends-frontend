import * as React from "react";
import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";
import Game from "./../features/game/Game";
import { Container } from "@mui/material";
import { useNewSessionQuery } from "../services/session";
import GameWsProvider from "../services/ws";

function App() {
  const { data, isLoading } = useNewSessionQuery();

  let content;
  if (isLoading) {
    content = <h1>loading...</h1>;
  } else {
    content = (
      <GameWsProvider sessionId={data.id}>
        <Game sessionId={data.id} players={data.players} />
      </GameWsProvider>
    );
  }

  return <Container fixed>{content}</Container>;
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
