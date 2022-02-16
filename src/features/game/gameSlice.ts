import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getWs } from "../../services/session";
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
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setParams: (state, action: PayloadAction<GameParameters>) => {
      state.params = action.payload;
      state.currentLetters = [...Array(state.params.wordLength)].map(
        () => " ",
      );
    },
    setWord: (state, action: PayloadAction<GameGuessUpdate>) => {
      for (let i = 0; i < state.currentLetters.length; i++) {
        if (i >= action.payload.letters.length) {
          state.currentLetters[i] = " "
        } else {
          state.currentLetters[i] = action.payload.letters[i]
        }
      }
    },
    setLetter: (state, action: PayloadAction<GameGuessAction>) => {
      getWs().send(JSON.stringify({
        action: "ADD_LETTER",
        params: action.payload.letter
      }))
      // if (state.currentLetters.length != state.params.wordLength) {
      //   state.currentLetters = [...Array(state.params.wordLength)].map(
      //     () => " ",
      //   );
      // }

      let newLetter

      // space string represents no letter in the spot
      if (action.payload.letter.length == 0) {
        // state.currentLetters[action.payload.index] = " ";
        newLetter = " ";
      } else {
        // state.currentLetters[action.payload.index] =
        //   action.payload.letter.charAt(action.payload.letter.length - 1);
        newLetter = action.payload.letter.charAt(action.payload.letter.length - 1);
      }
      getWs().send(JSON.stringify({
        action: "ADD_LETTER",
        params: newLetter
      }))
    },
    deleteLetter: (state) => {
      getWs().send(JSON.stringify({
        action: "DELETE_LETTER",
      }))
      // if (state.currentLetters.length > 0) {
      //   state.currentLetters.pop();
      // }
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

export const { setParams, setLetter, setWord, deleteLetter, submitGuess } =
  gameSlice.actions;

export default gameSlice.reducer;
