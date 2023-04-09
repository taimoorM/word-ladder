import { useState } from "react";

type letterPositionType = number | null;

function App() {
  const [words, setWords] = useState<string[][]>([]);
  const [wordBoard, setWordBoard] = useState<
    { definition: string; word: string; valid: boolean }[]
  >([]);
  const [wordInput, setWordInput] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  const handleWordSubmit = async () => {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/dictionary?word=${wordInput}`,
      {
        headers: { "X-Api-Key": import.meta.env.VITE_API_NINJAS_API_KEY },
      }
    );
    const data = await response.json();
    console.log(data);
    if (!data.valid) {
      console.log("Word does not exist");
    } else {
      setWordBoard([...wordBoard, data]);
      console.log(data);
      setWordInput("");
      setScore(score + wordInput.length);
    }
  };

  const handleGenerateWordLadder = async () => {
    setWordBoard([]);
    setWords([]);
    // Connect to API to get list of valid English words
    const response = await fetch(
      `https://random-word-api.herokuapp.com/word?number=3&length=5`
    );
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
      setWords((words) => [...words, data[i].split("")]);
    }
    console.log(words);
  };

  const handleLetterClick = (letter: string) => {
    setWordInput(wordInput + letter);
    console.log(wordInput);
  };

  return (
    <div className="container flex flex-col items-center h-screen mx-auto bg-blue-400">
      <div className="mb-20">
        <h1 className="text-4xl text-center">Wordzo</h1>
      </div>
      <div className="flex w-full justify-center">
        <div className="flex flex-col h-full">
          <div>Score: {score}</div>
          <div className="flex flex-col mr-32 w-[150px] border border-gray-800 p-2 space-y-2 h-full">
            {wordBoard.map((word, index) => (
              <div>
                <span>{index + 1}.</span> {word.word}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="h-10 flex justify-center">{wordInput}</div>

          <div className="flex flex-col justify-center items-center">
            {words.map((word) => (
              <div className="flex space-x-2 mb-5">
                {word.map((letter, i) => (
                  <div
                    key={i}
                    className="p-2 border-2 border-gray-600 w-10 h-10 flex justify-center items-center cursor-pointer"
                    onClick={() => handleLetterClick(letter)}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            ))}
            <div>
              <button onClick={handleWordSubmit}>Submit</button>
            </div>
            <button onClick={handleGenerateWordLadder}>START</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
