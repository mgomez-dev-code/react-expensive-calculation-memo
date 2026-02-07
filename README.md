# React Expensive Calculation + useMemo (Vite + TypeScript)

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)](https://react-expensive-calculation-memo.vercel.app)
![React](https://img.shields.io/badge/React-18-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Vite](https://img.shields.io/badge/Vite-7-646CFF)
![Vercel Deploy](https://deploy-badge.vercel.app/vercel/react-expensive-calculation-memo)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A focused **React performance demo** that illustrates **expensive computations**, **re-renders**, and how `useMemo` prevents unnecessary recalculation when unrelated state changes.

This project is intentionally simple and **educational**, designed to clearly show _when expensive logic runs and when it should not_.

---

## Live Demo

🔗 https://react-expensive-calculation-memo.vercel.app

---

## Deployment

This project is automatically deployed using Vercel with GitHub integration.

- Every push to `main` triggers a production deployment
- Pull requests generate preview deployments
- Build, optimization, and hosting are handled by Vercel

---

## What this demo shows

This app renders:

- An **expensive Fibonacci calculation**
- An input that controls the calculation (`Fibonacci N`)
- An **unrelated text input**
- A memoized list of selectable items (`Apple`, `Banana`, `Orange`, `Mango`)

By interacting with the UI and observing the **console logs**, you can clearly see:

- When the expensive calculation runs
- When components re-render
- When memoization prevents unnecessary work

---

## Key Concepts Demonstrated

### 1. Expensive computation without memoization (baseline)

The Fibonacci calculation is intentionally slow:

```ts
const slowFibonacci = (n: number): number => {
  if (n <= 1) return n;
  return slowFibonacci(n - 1) + slowFibonacci(n - 2);
};
```

This simulates a **CPU-heavy operation** often found in real applications
(data processing, large calculations, complex transforms).

---

### 2. `useMemo` to memoize expensive calculations

The result is memoized so it only recomputes when `n` changes:

```ts
const result = useMemo(() => {
  console.time("fib");
  const value = slowFibonacci(n);
  console.timeEnd("fib");
  return value;
}, [n]);
```

What this achieves:

- Changing **unrelated input** does NOT re-run Fibonacci
- Only changing `Fibonacci N` triggers recalculation
- Performance impact is visible via `console.time`

---

### 3. Memoized UI components (`React.memo`)

Both the result display and the item list are memoized:

```ts
const ResultCard = memo(function ResultCard({ value }: ResultCardProps) {
  console.log("ResultCard rendered");
  return <div>Result: {value}</div>;
});
```

```ts
const SlowList = memo(function SlowList({ onSelect }: SlowListProps) {
  console.log("SlowList rendered");
  ...
});
```

This prevents unnecessary UI re-renders when props are stable.

---

### 4. Stable callbacks with `useCallback`

The item click handler is memoized:

```ts
const handleSelect = useCallback((name: string) => {
  console.log("Selected:", name);
}, []);
```

Without this, memoized child components would still re-render
due to changing function references.

---

## Observing behavior via `console.log`

This demo **intentionally keeps `console.log` and `console.time` statements**.

They are essential to the learning goal:

- Typing in **Unrelated input** → Fibonacci does NOT run
- Changing **Fibonacci N** → Fibonacci runs again
- Selecting items → Only selection logs appear
- Memoized components remain stable

> ⚠️ Removing the logs would make the demo significantly less educational.

---

## Why this project exists

In small demos, expensive calculations are harmless.  
In real-world apps, they can cause:

- UI freezes
- Janky interactions
- Poor user experience

This project demonstrates:

- Why expensive computations must be controlled
- How `useMemo` isolates costly logic
- How to **prove performance improvements**, not assume them

It is a **proof of concept**, not a production-ready calculator.

---

## Project Structure

```
react-expensive-calculation-memo/
├─ src/
│  ├─ components/
│  │  ├─ ExpensiveCalculator.tsx
│  │  ├─ ResultCard.tsx
│  │  ├─ SlowList.tsx
│  │  └─ Item.tsx
│  ├─ App.tsx
│  └─ main.tsx
├─ public/
├─ index.html
└─ README.md
```

---

## Getting Started

```bash
npm install
npm run dev
# open http://localhost:5173
```

---

## Notes on React StrictMode

- React StrictMode is enabled
- In development, React **intentionally double-renders**
- This is expected behavior
- Production builds render only once

This demo is **StrictMode-safe**.

---

## How to experiment

Try the following experiments:

1. Remove `useMemo` → watch Fibonacci run on every keystroke
2. Remove `useCallback` → observe list re-renders
3. Remove `React.memo` → observe UI instability
4. Increase Fibonacci N → feel the performance cost

---

## License

This project is licensed under the **MIT License**.
