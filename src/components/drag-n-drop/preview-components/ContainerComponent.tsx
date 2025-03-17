
import React from 'react';

interface ContainerComponentProps {
  background?: string;
  border?: boolean;
  padding?: string;
  rounded?: boolean;
}

const ContainerComponent: React.FC<ContainerComponentProps> = ({
  background = 'bg-muted/30',
  border = true,
  padding = 'p-4',
  rounded = true,
}) => {
  return (
    <div 
      className={`w-full h-full ${background} ${padding} ${
        border ? 'border border-border' : ''
      } ${rounded ? 'rounded-lg' : ''}`}
    >
      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
        Container
      </div>
    </div>
  );
};

export default ContainerComponent;
