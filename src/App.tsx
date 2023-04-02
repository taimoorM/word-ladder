import { useState } from "react";

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
    <div>
      <label>
        Starting word:
        <input type="text" value={startWord} onChange={handleStartWordChange} />
      </label>
      <label>
        Ending word:
        <input type="text" value={endWord} onChange={handleEndWordChange} />
      </label>
      <button onClick={handleGenerateWordLadder}>Generate Word Ladder</button>
      {wordLadder.length > 0 && (
        <ul>
          {wordLadder.map((word) => (
            <li>{word}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
