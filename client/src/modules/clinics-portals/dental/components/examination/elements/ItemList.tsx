// ItemList.tsx
import React from "react";

interface ItemListProps {
  list?: string[];
}

const ItemList: React.FC<ItemListProps> = ({ list }) => {
  return (
    <div>
      <ul>
        {list?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
