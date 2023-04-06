import { useState } from "react";
import Keyboard from "./components/Keyboard";

function App() {
  const [startWord, setStartWord] = useState<string>("");
  const [endWord, setEndWord] = useState<string>("");
  const [wordLadder, setWordLadder] = useState([]);

  const handleStartWordChange = (event: any): void => {
    setStartWord(event.target.value);
  };

  const handleEndWordChange = (event: any) => {
    setEndWord(event.target.value);
  };

  const handleGenerateWordLadder = async () => {
    // Connect to API to get list of valid English words
    const response = await fetch(`https://random-word-api.herokuapp.com/word`);
    const data = await response.json();
    const validWords = data;
    console.log(validWords);
  };

  return (
    <div className="container flex justify-center items-center h-screen mx-auto">
      <div className="bg-gray-950">
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
