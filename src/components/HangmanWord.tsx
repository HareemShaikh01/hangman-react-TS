type HangmanWordProps = {
    guessedLetters: string[]
    wordToGuess: string
    reveal?: boolean
  }
  
  export function HangmanWord({
    guessedLetters,
    wordToGuess,
    reveal = false,
  }: HangmanWordProps) {
    return (
      <div
      className="flex gap-5 text-5xl uppercase font-mono font-semibold my-8"
      >
        {wordToGuess.split("").map((letter, index) => (
          <span className="border-b-4 border-black" key={index}>
            <span
              style={{
                visibility:
                  guessedLetters.includes(letter) || reveal
                    ? "visible"
                    : "hidden",
                color:
                  !guessedLetters.includes(letter) && reveal ? "red" : "black",
              }}
            >
              {letter}
            </span>
          </span>
        ))}
      </div>
    )
  }