import GameWsProvider from "../../services/ws";
import Game from "../game/Game";
import * as React from "react";

interface SessionProps {
  loading: boolean;
  sessionId: string;
}

export default function Session(props: SessionProps) {
  let content;
  if (props.loading || props.sessionId == "") {
    content = "";
  } else {
    content = (
      <GameWsProvider sessionId={props.sessionId}>
        <Game />
      </GameWsProvider>
    );
  }

  return content;
}
