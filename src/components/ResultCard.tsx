import { memo } from "react";

interface ResultCardProps {
  value: number;
}

const ResultCard = memo(function ResultCard({ value }: ResultCardProps) {
  console.log("ResultCard rendered");

  return (
    <div className="result-card">
      Result: <strong>{value}</strong>
    </div>
  );
});
export default ResultCard;
