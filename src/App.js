import React from "react";
import { useState } from "react";
import { evaluate } from "mathjs";
import "./index.css";

const App = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");

  const buttons = [
    ["AC", "+/-", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  const handleClick = (value) => {
    if (value === "=") {
      try {
        setResult(evaluate(expression).toString());
      } catch {
        setResult("Error");
      }
    } else if (value === "AC") {
      setExpression("");
      setResult("0");
    } else if (value === "+/-") {
      setExpression((prev) =>
        prev.startsWith("-") ? prev.slice(1) : "-" + prev
      );
    } else if (value === "x") {
      setExpression((prev) => prev + "*");
    } else if (value === "÷") {
      setExpression((prev) => prev + "/");
    } else {
      setExpression((prev) => prev + value);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-black w-80 h- [500px] rounded-lg p-4">
        {/* Display sec */}
        <div className="text-white text-right text-4xl p-5 bg-black h-24">
          <div className="text-gray-400 text-lg">{expression}</div>
          <div>{result}</div>
        </div>

        {/* Buttons sec */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.flat().map((btn) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
             className={`text-3xl rounded-full w-30 h-20  ${
                ["/", "x", "-", "+", "="].includes(btn)
                  ? "bg-orange-500 text-white"
                  : btn === "AC" || btn === "+/-" || btn === "%"
                  ? "bg-gray-500 text-black"
                  : "bg-gray-800 text-white"
              } flex justify-center items-center`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
