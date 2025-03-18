
import React from 'react';

interface HeadingProps {
  text: string;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  color?: string;
}

const Heading: React.FC<HeadingProps> = ({ 
  text, 
  level = 'h2', 
  color = 'text-foreground' 
}) => {
  const className = `${color} w-full h-full flex items-center font-semibold`;
  
  switch (level) {
    case 'h1':
      return <h1 className={`${className} text-4xl`}>{text}</h1>;
    case 'h2':
      return <h2 className={`${className} text-3xl`}>{text}</h2>;
    case 'h3':
      return <h3 className={`${className} text-2xl`}>{text}</h3>;
    case 'h4':
      return <h4 className={`${className} text-xl`}>{text}</h4>;
    case 'h5':
      return <h5 className={`${className} text-lg`}>{text}</h5>;
    case 'h6':
      return <h6 className={`${className} text-base`}>{text}</h6>;
    default:
      return <h2 className={`${className} text-3xl`}>{text}</h2>;
  }
};

export default Heading;
