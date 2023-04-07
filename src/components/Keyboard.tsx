const keys = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
];

function Keyboard({ handleLetterChange }: { handleLetterChange: any }) {
  return (
    <div className="inline-grid grid-rows-3 grid-cols-10 content-center">
      {keys.map((key) => (
        <button
          key={key}
          onClick={() => handleLetterChange(key)}
          className="h-10 w-10 flex justify-center items-center m-1 text-white border rounded-sm hover:bg-gray-50 hover:text-gray-950 transition-colors"
        >
          {key}
        </button>
      ))}
    </div>
  );
}
export default Keyboard;
