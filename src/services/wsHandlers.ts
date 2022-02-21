import { AppDispatch } from "../store";
import {
  setCurrentWord,
  setParams,
  setPlayers,
  submitGuess,
} from "../features/game/gameSlice";
import { splitLetters } from "../features/game/util";

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
      letters = splitLetters(data.params as string);
      dispatch(setCurrentWord({ letters }));
      break;
    case "LETTER_DELETED":
      letters = splitLetters(data.params as string);
      dispatch(setCurrentWord({ letters }));
      break;
    case "PLAYER_JOINED":
      dispatch(setPlayers(data.params as string[]));
      break;
    case "SUBMISSION_RESULT":
      dispatch(submitGuess(data.params as string));
      break;
  }
}

export { handle };
