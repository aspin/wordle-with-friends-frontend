export interface GameParameters {
  maxGuesses: number;
  wordLength: number;
}

export interface Session {
  id: string;
  players: string[];
}
