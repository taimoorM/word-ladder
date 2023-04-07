import { useState } from "react";
import Keyboard from "./components/Keyboard";

type selectedLetterType = number | null;

function App() {
  const [startWord, setStartWord] = useState<string>("");
  const [endWord, setEndWord] = useState<string>("");
  const [letterBoard, setLetterBoard] = useState([]);
  const [selectedLetter, setSelectedLetter] =
    useState<selectedLetterType>(null);

  const handleGenerateWordLadder = async () => {
    // Connect to API to get list of valid English words
    const response = await fetch(
      `https://random-word-api.herokuapp.com/word?number=2&length=5`
    );
    const data = await response.json();
    const validWords = data;
    setStartWord(validWords[0]);
    setEndWord(validWords[1]);
    setLetterBoard(validWords[0].split(""));
  };

  const handleLetterClick = (index: number) => {
    setSelectedLetter(index);
  };

  return (
    <div className="container justify-center items-center h-screen mx-auto">
      <div>
        <h1 className="text-4xl text-center">Word Ladder</h1>
      </div>
      <div>
        <div className="text-2xl">
          <span>Starting Word:</span> {startWord}
        </div>
        <div className="text-2xl">
          <span>End Word:</span> {endWord}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex space-x-2">
          {letterBoard.map((letter, index) => (
            <div
              key={index}
              className="p-2 border-2 border-gray-600 mb-20 w-10 h-10 flex justify-center items-center"
              onClick={() => handleLetterClick(index)}
            >
              {letter}
            </div>
          ))}
        </div>
        <div className="bg-gray-950">
          <Keyboard />
        </div>
        <button onClick={handleGenerateWordLadder}>CLICK</button>
      </div>
    </div>
  );
}

export default App;
