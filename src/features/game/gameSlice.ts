import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameSlice {
  params: GameParameters;
  currentLetters: string[];
  previousGuesses: string[];
}

export interface GameParameters {
  maxGuesses: number;
  wordLength: number;
}

const initialState: GameSlice = {
  params: {
    maxGuesses: 5,
    wordLength: 5,
  },
  currentLetters: [],
  previousGuesses: ["arise", "piggy"],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setParams: (state, action: PayloadAction<GameParameters>) => {
      state.params = action.payload;
    },
    addLetter: (state, action: PayloadAction<string>) => {
      state.currentLetters.push(action.payload[0]);
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

export const { setParams, addLetter, deleteLetter, submitGuess } =
  gameSlice.actions;

export default gameSlice.reducer;
