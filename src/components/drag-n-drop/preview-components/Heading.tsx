
import React, { useState, useEffect, useRef } from 'react';
import useLayoutStore from '@/store/layoutStore';

interface HeadingProps {
  text: string;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  color?: string;
  id?: string;
}

const Heading: React.FC<HeadingProps> = ({ 
  text, 
  level = 'h2', 
  color = 'text-foreground',
  id
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);
  const updateComponent = useLayoutStore(state => state.updateComponent);
  const selectedItemId = useLayoutStore(state => state.selectedItemId);
  
  useEffect(() => {
    setEditedText(text);
  }, [text]);
  
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);
  
  const handleDoubleClick = (e: React.MouseEvent) => {
    if (id) {
      e.stopPropagation();
      setIsEditing(true);
    }
  };
  
  const handleBlur = () => {
    setIsEditing(false);
    if (id && editedText !== text) {
      updateComponent(id, { text: editedText });
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setEditedText(text);
      setIsEditing(false);
    }
  };
  
  const baseClassName = `${color} w-full h-full flex items-center font-semibold ${
    id === selectedItemId ? 'outline outline-1 outline-dashed outline-primary/50' : ''
  }`;
  
  if (isEditing && id) {
    return (
      <input
        ref={inputRef}
        className={`${baseClassName} bg-transparent outline-none border border-primary/30 focus:border-primary rounded px-2`}
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    );
  }
  
  const renderHeading = () => {
    switch (level) {
      case 'h1':
        return <h1 className={`${baseClassName} text-4xl`} onDoubleClick={handleDoubleClick}>{text}</h1>;
      case 'h2':
        return <h2 className={`${baseClassName} text-3xl`} onDoubleClick={handleDoubleClick}>{text}</h2>;
      case 'h3':
        return <h3 className={`${baseClassName} text-2xl`} onDoubleClick={handleDoubleClick}>{text}</h3>;
      case 'h4':
        return <h4 className={`${baseClassName} text-xl`} onDoubleClick={handleDoubleClick}>{text}</h4>;
      case 'h5':
        return <h5 className={`${baseClassName} text-lg`} onDoubleClick={handleDoubleClick}>{text}</h5>;
      case 'h6':
        return <h6 className={`${baseClassName} text-base`} onDoubleClick={handleDoubleClick}>{text}</h6>;
      default:
        return <h2 className={`${baseClassName} text-3xl`} onDoubleClick={handleDoubleClick}>{text}</h2>;
    }
  };
  
  return renderHeading();
};

export default Heading;
