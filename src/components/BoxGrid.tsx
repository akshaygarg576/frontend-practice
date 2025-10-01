import { useEffect, useState, useRef } from "react";

// Problem Statement:
// Create a `BoxGrid` component that takes three props:
// `n` – Number of boxes to render
// `primaryColor` – Initial color of the boxes. Example: red
// `secondaryColor` – Color to switch to when clicked. Example: blue

// Behavior:
// 1. Clicking a box toggles its color between primaryColor and secondaryColor.
// 2. Track the order in which the boxes were clicked.
// 3. When all boxes are in secondaryColor, wait 10 seconds and then
// change them back to primaryColor in the order they were clicked.

const BoxGrid = ({
  n,
  primaryColor,
  secondaryColor,
}: {
  n: number;
  primaryColor: string;
  secondaryColor: string;
}) => {
  const [colors, setColors] = useState(Array(n).fill(primaryColor));
  const clickedOrderRef = useRef<number[]>([]);
  const colorsRef = useRef(colors);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const [isIntervalRunning, setIsIntervalRunning] = useState(false);

  // update ref.current when the corresponding state changes
  useEffect(() => {
    colorsRef.current = colors;
  }, [colors]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isIntervalRunning) {
      return;
    }

    const targetElement = event.target as HTMLDivElement;

    // safe check because onclick is added on parent,
    // so if clicked between margin between the grids
    // event will be triggered
    if (!targetElement.dataset.index) {
      return;
    }
    const id = Number(targetElement.dataset.index);

    // Logic:
    // check if clicked item isn't already secondaryColor
    // if not, then check if the array length of clickedOrder !== n
    // then push to array

    if (colors[id] === secondaryColor || clickedOrderRef.current.length === n) {
      return;
    }

    clickedOrderRef.current.push(id);
    setColors((prevState) => {
      return prevState.map((color, index) => {
        if (index === id) {
          return secondaryColor;
        }

        return color;
      });
    });
  };

  useEffect(() => {
    if (clickedOrderRef.current.length !== n) {
      return;
    }

    setIsIntervalRunning(true);

    // If intervalId is not a ref, every time useEffect runs (due to state updates like setColors),
    // a new intervalId is created and the old one is lost.
    intervalIdRef.current = setInterval(() => {
      // stale closure will be formed in setInterval if we don't use ref
      const indexToWork = clickedOrderRef.current.shift();

      setColors(
        colorsRef.current.map((color, index) => {
          if (index === indexToWork) {
            return primaryColor;
          }

          return color;
        })
      );

      if (clickedOrderRef.current.length <= 0) {
        if (intervalIdRef.current) clearInterval(intervalIdRef.current);
        setIsIntervalRunning(false);
      }
    }, 1000);
  }, [colors]);

  // clearInterval on component unmount to avoid memory leakage
  useEffect(() => {
    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  }, []);

  return (
    <div className="flex flex-wrap" onClick={handleClick}>
      {colors.map((color, index) => {
        return (
          <div
            key={index}
            className="w-1/4 m-2"
            data-index={index}
            style={{
              height: "50px",
              backgroundColor: color,
              cursor: "pointer",
            }}
          />
        );
      })}
    </div>
  );
};

export default BoxGrid;
