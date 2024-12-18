import { useCallback, useEffect, useState } from "react";
import words from "./wordList.json";
import HangmanDiagram from "./components/HangmanDiagram";
import {HangmanWord} from "./components/HangmanWord";
import {Keyboard} from "./components/Keyboard";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState<string>(getWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]); // Array of guessed letters

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split("").every((letter) =>
    guessedLetters.includes(letter)
  );

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isLoser, isWinner]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [addGuessedLetter]);

  useEffect(() => {
    const resetHandler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setGuessedLetters([]);
        setWordToGuess(getWord());
      }
    };

    document.addEventListener("keypress", resetHandler);
    return () => {
      document.removeEventListener("keypress", resetHandler);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center capitalize font-semibold my-5 text-lg md:text-xl">
        {(!isLoser && !isWinner) && "Let's check how lucky you are!"}
        {isWinner && "Winner! Press Enter to try again."}
        {isLoser && "Nice try! Press Enter to try again."}
      </div>

      <HangmanDiagram numberOfGuesses={incorrectLetters.length} />

      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />

      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
