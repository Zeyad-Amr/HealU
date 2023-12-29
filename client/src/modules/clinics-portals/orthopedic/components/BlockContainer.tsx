// BlockContainer.tsx
import React from 'react';
import BlockComponent1 from './block';
import BlockComponent2 from './block2';

const BlockContainer: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <BlockComponent1 />
      <BlockComponent2 />
    </div>
  );
};

export default BlockContainer;
