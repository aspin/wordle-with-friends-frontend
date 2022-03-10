export interface GameParameters {
  maxGuesses: number;
  wordLength: number;
}

export interface Session {
  id: string;
  players: string[];
}

export interface GameGuess {
  letters: GameGuessLetter[];
}

export interface GameGuessLetter {
  letter: string;
  playerId: string;
  state: GameGuessLetterState;
}

export enum GameGuessLetterState {
  Unknown,
  Correct,
  Partial,
  Incorrect,
}

export function getLetters(gameGuess: GameGuess): string[] {
  return gameGuess.letters.map((lg) => lg.letter);
}
