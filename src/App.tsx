import { useState } from "react";
import Keyboard from "./components/Keyboard";

type letterPositionType = number | null;

function App() {
  const [wordsDisplayed, setWordsDisplayed] = useState([]);
  const [letterBoard, setLetterBoard] = useState([]);
  const [letterPosition, setLetterPosition] =
    useState<letterPositionType>(null);
  const [letter, setLetter] = useState<string>("");

  const handleLetterChange = (letter: string) => {
    setLetter(letter);
    console.log(letter);
  };

  //two words, 5 letters each
  //set timer for 1 minute
  //players come with words using the letter in the two words
  //if the word is valid, it will be added to the board
  //players receive points for each word they add based on the length of the word
  //if the word is not valid, they lose points

  const handleGenerateWordLadder = async () => {
    // Connect to API to get list of valid English words
    const response = await fetch(
      `https://random-word-api.herokuapp.com/word?number=2&length=5`
    );
    const data = await response.json();
    const validWords = data;
    setWordsDisplayed(validWords)
  };

  const handleLetterClick = (index: number) => {
    setLetterPosition(index);
  };

  return (
    <div className="container justify-center items-center h-screen mx-auto">
      <div>
        <h1 className="text-4xl text-center">Word Ladder</h1>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="flex space-x-2">
          {wordsDisplayed.map((letter, index) => (
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
          <Keyboard handleLetterChange={handleLetterChange} />
        </div>
        <button onClick={handleGenerateWordLadder}>CLICK</button>
      </div>
    </div>
  );
}

export default App;
