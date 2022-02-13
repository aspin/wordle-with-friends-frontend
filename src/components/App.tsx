import * as React from "react";
import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";
import Game from "./../features/game/Game";
import { Container } from "@mui/material";

class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <Container fixed>
        <Game />
      </Container>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
