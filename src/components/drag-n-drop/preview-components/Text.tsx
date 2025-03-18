
import React from 'react';

interface TextProps {
  text: string;
  color?: string;
  size?: string;
}

const Text: React.FC<TextProps> = ({ 
  text = 'Text content', 
  color = 'text-foreground', 
  size = 'text-base' 
}) => {
  return (
    <p className={`${color} ${size} w-full h-full flex items-center`}>
      {text}
    </p>
  );
};

export default Text;
