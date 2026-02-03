import { memo } from "react";

interface ItemProps {
  name: string;
  onClick: (name: string) => void;
}

const Item = memo(function Item({ name, onClick }: ItemProps) {
  console.log(`Item rendered: ${name}`);

  return (
    <li className="item-card" onClick={() => onClick(name)}>
      {name}
    </li>
  );
});

export default Item;
