import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (second, replace = false) => {
    if (!replace) {
      setHistory((prev) => {
        const previousChange = prev;
        previousChange.push(second);
        setHistory(previousChange);
      });
    }
    setMode(second);
  };

  const back = () => {
    setHistory((prev) => {
      const updated = prev;
      if (updated.length >= 2) updated.pop();
      setHistory(updated);
    });
    if (history.length >= 2) {
      setMode(history[history.length - 2]);
    } else {
      setMode(history[0]);
    }
  };
  return { mode, transition, back };
}
