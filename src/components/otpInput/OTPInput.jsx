import { useEffect, useRef, useState } from "react";
import "./OTPInput.css";

const OTPInput = ({ size }) => {
  const [input, setInput] = useState(Array(size).fill(""));
  const refs = useRef([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  const handleChange = (e, index) => {
    // trimming is important
    const value = e.target.value.trim();

    if (isNaN(value) && value) {
      return;
    }

    setInput((prev) => {
      const newInput = [...prev];
      // prevents adding more than 1 digit in a box
      newInput[index] = value;
      return newInput;
    });

    // auto focus to next element
    if (index < size - 1) {
      refs.current[index + 1].focus();
    }
  };

  return (
    <div className="container">
      {input.map((value, index) => {
        return (
          <input
            key={index}
            maxLength="1"
            className="cell"
            ref={(element) => (refs.current[index] = element)}
            type="text"
            value={value}
            onChange={(e) => handleChange(e, index)}
          />
        );
      })}
    </div>
  );
};

export default OTPInput;
