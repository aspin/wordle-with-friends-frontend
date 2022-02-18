const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// " " is used to signify
export function isEmpty(letter: string): boolean {
  return letter == "" || letter == " ";
}

export function unusedLetters(words: string[]): string[] {
  const remaining = {};
  for (const letter of alphabet) {
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

// TODO: review this usage (should be " "?)
export function emptyLetters(len: number): string[] {
  return [...Array(len)].map(() => "");
}

export function letters(s: string): string[] {
  return s.split("");
}
