const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export function unusedLetters(words: string[]): string[] {
  const remaining = {};
  for (const letter in alphabet) {
    remaining[letter] = 1;
  }

  for (const word of words) {
    for (const letter of word) {
      if (letter in remaining) {
        delete remaining[letter];
      }

      if (Object.keys(remaining).length == 0) {
        return [];
      }
    }
  }

  return Object.keys(remaining);
}
