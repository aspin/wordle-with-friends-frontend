import * as React from "react";
import { useAppDispatch } from "../hooks";
import { setParams, setWord } from "../features/game/gameSlice";
import { AppDispatch } from "../store";

let ws;
const wsPath = "ws://localhost:9000";

interface GameWsContextInterface {
  ws: WebSocket;
}

export const GameWsContext = React.createContext<GameWsContextInterface>(null);

interface GameWsProps {
  children?: unknown;
  sessionId: string;
}

export default function GameWsProvider(props: GameWsProps) {
  const dispatch = useAppDispatch();

  if (!ws) {
    ws = new WebSocket(`${wsPath}/session/${props.sessionId}`);
    ws.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);

      // TODO: should really determine game params vs event better...
      if ("wordLength" in data) {
        handleParams(dispatch, data);
      }

      if ("event" in data) {
        handleEvent(dispatch, data);
      }
    });
  }

  const gameWs: GameWsContextInterface = {
    ws,
  };

  return (
    <GameWsContext.Provider value={gameWs}>
      {props.children}
    </GameWsContext.Provider>
  );
}

interface ParamsUpdate {
  wordLength: number;
  maxGuesses: number;
}

function handleParams(dispatch: AppDispatch, data: ParamsUpdate) {
  console.log("got a params update", data);
  dispatch(setParams(data));
}

interface GameEvent {
  event: string;
  params: unknown;
}

function handleEvent(dispatch: AppDispatch, data: GameEvent) {
  console.log("got a game event", data);

  let letters;
  switch (data.event) {
    case "LETTER_ADDED":
      letters = (data.params as string).split("");
      dispatch(setWord({ letters }));
      break;
    case "LETTER_DELETED":
      letters = (data.params as string).split("");
      dispatch(setWord({ letters }));
      break;
    case "GUESS_SUBMITTED":
      break;
  }
}
