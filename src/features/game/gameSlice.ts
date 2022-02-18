import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameParameters } from "../../types/game";

export interface GameSlice {
  params: GameParameters;
  currentLetters: string[];
  previousGuesses: string[];
  players: string[];
}

export interface GameGuessAction {
  index: number;
  letter: string;
}

export interface GameGuessUpdate {
  letters: string[];
}

const initialState: GameSlice = {
  params: {
    maxGuesses: 5,
    wordLength: 5,
  },
  currentLetters: [" ", " ", " ", " ", " "],
  previousGuesses: ["arise", "piggy"],
  players: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setParams: (state, action: PayloadAction<GameParameters>) => {
      state.params = action.payload;
      state.currentLetters = [...Array(state.params.wordLength)].map(() => " ");
    },
    setWord: (state, action: PayloadAction<GameGuessUpdate>) => {
      for (let i = 0; i < state.currentLetters.length; i++) {
        if (i >= action.payload.letters.length) {
          state.currentLetters[i] = " ";
        } else {
          state.currentLetters[i] = action.payload.letters[i];
        }
      }
    },
    setPlayers: (state, action: PayloadAction<string[]>) => {
      state.players = action.payload;
    },
    submitGuess: (state, action: PayloadAction<string>) => {
      state.previousGuesses.push(action.payload);
      state.currentLetters = [];
    },
  },
});

export const { setParams, setWord, setPlayers, submitGuess } =
  gameSlice.actions;

export default gameSlice.reducer;
