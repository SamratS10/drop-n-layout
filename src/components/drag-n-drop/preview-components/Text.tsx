
import React, { useState, useEffect, useRef } from 'react';
import useLayoutStore from '@/store/layoutStore';

interface TextProps {
  text: string;
  color?: string;
  size?: string;
  id?: string;
}

const Text: React.FC<TextProps> = ({ text, color = 'text-foreground', size = 'text-base', id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const updateComponent = useLayoutStore(state => state.updateComponent);
  const selectedItemId = useLayoutStore(state => state.selectedItemId);

  // Reset edited text when the prop changes
  useEffect(() => {
    setEditedText(text);
  }, [text]);

  // Focus the input when editing starts
  useEffect(() => {
    if (isEditing && textInputRef.current) {
      textInputRef.current.focus();
      textInputRef.current.select();
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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    } else if (e.key === 'Escape') {
      setEditedText(text);
      setIsEditing(false);
    }
  };

  if (isEditing && id) {
    return (
      <textarea
        ref={textInputRef}
        className={`${color} ${size} w-full h-full p-0 resize-none outline-none border border-primary/30 focus:border-primary rounded bg-transparent`}
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    );
  }

  return (
    <p 
      className={`${color} ${size} w-full h-full flex items-center ${id === selectedItemId ? 'outline outline-1 outline-dashed outline-primary/50' : ''}`}
      onDoubleClick={handleDoubleClick}
    >
      {text}
    </p>
  );
};

export default Text;
