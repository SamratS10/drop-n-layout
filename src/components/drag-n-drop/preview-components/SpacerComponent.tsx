
import React from 'react';

interface SpacerComponentProps {
  height?: string;
}

const SpacerComponent: React.FC<SpacerComponentProps> = ({ 
  height = '2rem' 
}) => {
  return (
    <div className="w-full" style={{ height }}></div>
  );
};

export default SpacerComponent;
