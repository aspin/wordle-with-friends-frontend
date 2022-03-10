import GameWsProvider from "../../services/ws";
import Game from "../game/Game";
import * as React from "react";

interface SessionProps {
  loading: boolean;
  sessionId: string;
  disconnect: () => void;
}

export default function Session(props: SessionProps) {
  let content;
  if (props.loading || props.sessionId == "") {
    content = "";
  } else {
    content = (
      <GameWsProvider sessionId={props.sessionId}>
        <Game sessionId={props.sessionId} disconnect={props.disconnect} />
      </GameWsProvider>
    );
  }

  return content;
}
