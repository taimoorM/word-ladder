import { useState } from "react";
import Keyboard from "./components/Keyboard";

function App() {
  const [startWord, setStartWord] = useState<string>("");
  const [endWord, setEndWord] = useState<string>("");
  const [wordLadder, setWordLadder] = useState([]);

  const handleGenerateWordLadder = async () => {
    // Connect to API to get list of valid English words
    const response = await fetch(
      `https://random-word-api.herokuapp.com/word?number=2&length=5`
    );
    const data = await response.json();
    const validWords = data;
    setStartWord(validWords[0]);
    setEndWord(validWords[1]);
  };

  return (
    <div className="container flex justify-center items-center h-screen mx-auto">
      <div className="bg-gray-950">
        <Keyboard />
      </div>
      {startWord}
      {endWord}
      <button onClick={handleGenerateWordLadder}>CLICK</button>
    </div>
  );
}

export default App;
