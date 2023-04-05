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

function Keyboard() {
  return (
    <div>
      {keys.map((key) => (
        <button key={key} className="key">
          {key}
        </button>
      ))}
    </div>
  );
}
export default Keyboard;
