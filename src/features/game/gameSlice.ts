import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameParameters } from "../../types/game";

export interface GameSlice {
  params: GameParameters;
  currentLetters: string[];
  previousGuesses: string[];
}

export interface GameGuessAction {
  index: number;
  letter: string;
}

const initialState: GameSlice = {
  params: {
    maxGuesses: 5,
    wordLength: 5,
  },
  currentLetters: [" ", " ", " ", " ", " "],
  previousGuesses: ["arise", "piggy"],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setParams: (state, action: PayloadAction<GameParameters>) => {
      state.params = action.payload;
    },
    setLetter: (state, action: PayloadAction<GameGuessAction>) => {
      if (state.currentLetters.length != state.params.wordLength) {
        state.currentLetters = [...Array(state.params.wordLength)].map(
          () => " ",
        );
      }

      // space string represents no letter in the spot
      if (action.payload.letter.length == 0) {
        state.currentLetters[action.payload.index] = " ";
      } else {
        state.currentLetters[action.payload.index] =
          action.payload.letter.charAt(action.payload.letter.length - 1);
      }
    },
    deleteLetter: (state) => {
      if (state.currentLetters.length > 0) {
        state.currentLetters.pop();
      }
    },
    submitGuess: (state) => {
      if (
        state.currentLetters.length == state.params.wordLength &&
        state.previousGuesses.length < state.params.maxGuesses
      ) {
        const word = state.currentLetters.join();
        state.previousGuesses.push(word);
        state.currentLetters = [];
      }
    },
  },
});

export const { setParams, setLetter, deleteLetter, submitGuess } =
  gameSlice.actions;

export default gameSlice.reducer;
