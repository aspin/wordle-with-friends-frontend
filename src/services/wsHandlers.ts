import { AppDispatch } from "../store";
import { setParams, setWord } from "../features/game/gameSlice";

function handle(dispatch: AppDispatch, data: object) {
  // TODO: should really determine game params vs event better...
  if ("wordLength" in data) {
    handleParams(dispatch, data as ParamsUpdate);
  }

  if ("event" in data) {
    handleEvent(dispatch, data as GameEvent);
  }
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

export { handle };
