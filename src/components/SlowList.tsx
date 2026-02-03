import { memo } from "react";
import Item from "./Item";

interface SlowListProps {
  onSelect: (name: string) => void;
}

const SlowList = memo(function SlowList({ onSelect }: SlowListProps) {
  console.log("SlowList rendered");

  const items = ["Apple", "Banana", "Orange", "Mango"];

  return (
    <ul className="item-list">
      {items.map((item) => (
        <Item key={item} name={item} onClick={onSelect} />
      ))}
    </ul>
  );
});

export default SlowList;
