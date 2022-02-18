import * as React from "react";
import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";
import Game from "./../features/game/Game";
import { Container } from "@mui/material";
import GameWsProvider from "../services/ws";
import { useNewSessionQuery } from "../services/session";

function App() {
  const { data, isLoading } = useNewSessionQuery();

  // const isLoading = false;
  // const dataId = "484421c8-649a-4f18-9222-fb10368c1b2a";
  // const dataPlayers = [];
  //
  let content;
  if (isLoading) {
    content = <h1>loading...</h1>;
  } else {
    content = (
      <GameWsProvider sessionId={data.id}>
        <Game sessionId={data.id} />
      </GameWsProvider>
      // <GameWsProvider sessionId={dataId}>
      //   <Game sessionId={dataId} players={dataPlayers} />
      // </GameWsProvider>
    );
  }

  return <Container fixed>{content}</Container>;
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
