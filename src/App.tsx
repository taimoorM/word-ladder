import { useState } from "react";
import Keyboard from "./components/Keyboard";

type letterPositionType = number | null;

function App() {
  const [wordOne, setWordOne] = useState([]);
  const [wordTwo, setWordTwo] = useState([]);
  const [wordThree, setWordThree] = useState([]);
  const [wordBoard, setWordBoard] = useState<string[]>([]);
  const [wordInput, setWordInput] = useState<string>("");

  const handleWordSubmit = async () => {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput}`
    );
    const data = await response.json();
    console.log(data);
    if (data.title === "No Definitions Found") {
      console.log("No Definitions Found");
    } else {
      setWordBoard([...wordBoard, wordInput]);
      console.log(wordBoard);
      setWordInput("");
    }
  };

  const handleGenerateWordLadder = async () => {
    // Connect to API to get list of valid English words
    const response = await fetch(
      `https://random-word-api.herokuapp.com/word?number=3&length=5`
    );
    const data = await response.json();
    const validWords = data;
    setWordOne(validWords[0].split(""));
    setWordTwo(validWords[1].split(""));
    setWordThree(validWords[2].split(""));
  };

  const handleLetterClick = (letter: string) => {
    setWordInput(wordInput + letter);
    console.log(wordInput);
  };

  return (
    <div className="container justify-center items-center h-screen mx-auto">
      <div className="mb-20">
        <h1 className="text-4xl text-center">Wordzo</h1>
      </div>

      <div className="h-10 flex justify-center">{wordInput}</div>

      <div className="flex flex-col justify-center items-center">
        <div className="flex space-x-2 mb-5">
          {wordOne.map((letter, index) => (
            <div
              key={index}
              className="p-2 border-2 border-gray-600 w-10 h-10 flex justify-center items-center cursor-pointer"
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </div>
          ))}
        </div>
        <div className="flex space-x-2 mb-5">
          {wordTwo.map((letter, index) => (
            <div
              key={index}
              className="p-2 border-2 border-gray-600  w-10 h-10 flex justify-center items-center cursor-pointer"
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </div>
          ))}
        </div>
        <div className="flex space-x-2 mb-10">
          {wordThree.map((letter, index) => (
            <div
              key={index}
              className="p-2 border-2 border-gray-600  w-10 h-10 flex justify-center items-center cursor-pointer"
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </div>
          ))}
        </div>
        <div>
          <button onClick={handleWordSubmit}>Submit</button>
        </div>
        <button onClick={handleGenerateWordLadder}>START</button>
      </div>
    </div>
  );
}

export default App;
