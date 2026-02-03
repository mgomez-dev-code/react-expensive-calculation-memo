import { useState, useMemo, useCallback } from "react";
import ResultCard from "./ResultCard";
import SlowList from "./SlowList";

const slowFibonacci = (n: number): number => {
  if (n <= 1) return n;
  return slowFibonacci(n - 1) + slowFibonacci(n - 2);
};

const ExpensiveCalculator = () => {
  const [n, setN] = useState(35);
  const [text, setText] = useState("");

  // Expensive calculation memoized
  const result = useMemo(() => {
    console.time("fib");
    const value = slowFibonacci(n);
    console.timeEnd("fib");
    return value;
  }, [n]);

  // Callback memoized
  const handleSelect = useCallback((name: string) => {
    console.log("Selected:", name);
  }, []);

  return (
    <div className="card">
      <div className="controls">
        <label className="label">
          Fibonacci N
          <input
            className="input"
            type="number"
            min={1}
            max={45}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
          />
        </label>

        <label className="label">
          Unrelated input
          <input
            className="input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type fast..."
          />
        </label>
      </div>

      <ResultCard value={result} />

      <SlowList onSelect={handleSelect} />
    </div>
  );
};

export default ExpensiveCalculator;
