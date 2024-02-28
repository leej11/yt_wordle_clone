import wordBank from "./wordle-bank.txt";

// This is our default board
export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

// Asynchronous function to 'fetch' the list of words from
// wordbank.txt file, ready to play the game! :D
export const generateWordSet = async () => {
  let wordSet;
  let todaysWord;

  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n");
      todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
      wordSet = new Set(wordArr);
    });

  return { wordSet, todaysWord };
};
