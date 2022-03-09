export interface GameParameters {
  maxGuesses: number;
  wordLength: number;
}

export interface Session {
  id: string;
  players: string[];
}

export enum GameGuessLetterState {
  Unknown,
  Correct,
  Partial,
  Incorrect,
}

export interface GameGuess {
  letters: {
    letter: string;
    playerId: string;
    state: GameGuessLetterState;
  }[];
}

export function getLetters(gameGuess: GameGuess): string[] {
  return gameGuess.letters.map((lg) => lg.letter);
}
