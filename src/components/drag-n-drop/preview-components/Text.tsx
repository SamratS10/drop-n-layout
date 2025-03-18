
import React, { useState, useEffect, useRef } from 'react';
import useLayoutStore from '@/store/layoutStore';

interface TextProps {
  text: string;
  color?: string;
  size?: string;
  id?: string;
}

const Text: React.FC<TextProps> = ({ 
  text = 'Text content', 
  color = 'text-foreground', 
  size = 'text-base',
  id
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState(text);
  const updateComponent = useLayoutStore((state) => state.updateComponent);
  const selectedItemId = useLayoutStore((state) => state.selectedItemId);
  const textRef = useRef<HTMLDivElement>(null);

  // Update local text state when props change
  useEffect(() => {
    setEditableText(text);
  }, [text]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (id) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    if (id && editableText !== text) {
      updateComponent(id, { text: editableText });
    }
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setEditableText(e.currentTarget.textContent || '');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      textRef.current?.blur();
    }
  };

  // Focus the text element when entering edit mode
  useEffect(() => {
    if (isEditing && textRef.current) {
      textRef.current.focus();
      
      // Set cursor to end of text
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(textRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [isEditing]);

  return (
    <div 
      className={`${color} ${size} w-full h-full flex items-center relative ${
        isEditing ? 'ring-2 ring-primary/50' : ''
      }`}
      onDoubleClick={handleDoubleClick}
      onClick={(e) => e.stopPropagation()} // Prevent event bubbling when clicking on text
    >
      <div
        ref={textRef}
        contentEditable={isEditing}
        onBlur={handleBlur}
        onInput={handleChange}
        onKeyDown={handleKeyDown}
        className={`outline-none w-full ${isEditing ? 'bg-primary/5 px-2 py-1' : ''}`}
        suppressContentEditableWarning={true}
      >
        {editableText}
      </div>
      
      {!isEditing && selectedItemId === id && (
        <div className="absolute inset-0 pointer-events-none border border-dashed border-primary/30"></div>
      )}
      
      {!isEditing && (
        <div className="absolute bottom-1 right-1 text-xs text-muted-foreground opacity-70 pointer-events-none">
          Double-click to edit
        </div>
      )}
    </div>
  );
};

export default Text;
