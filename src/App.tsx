import "./App.css";
import ExpensiveCalculator from "./components/ExpensiveCalculator";

const App = () => {
  return (
    <div className="app">
      <h1 className="title">Expensive Calculation + useMemo</h1>
      <p className="subtitle">
        Type in the input and watch the UI. Then we'll memoize the expensive
        computation.
      </p>

      <ExpensiveCalculator />
    </div>
  );
};

export default App;
