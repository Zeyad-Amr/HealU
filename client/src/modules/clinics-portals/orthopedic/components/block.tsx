// BlockComponent.tsx
import React from 'react';
import './block.css';

const BlockComponent: React.FC = () => {
  return (
    <div className="block">
      <h2>This is a Block</h2>
      <p>Some content inside the block.</p>
    </div>
  );
};

export default BlockComponent;
