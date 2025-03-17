
import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import PreviewComponent from './preview-components';
import { ComponentItem } from '@/types/layout';
import useLayoutStore from '@/store/layoutStore';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface GridItemProps {
  component: ComponentItem;
}

const GridItem: React.FC<GridItemProps> = ({ component }) => {
  const { id, type, props } = component;
  const [isHovered, setIsHovered] = useState(false);
  
  const selectedItemId = useLayoutStore((state) => state.selectedItemId);
  const selectItem = useLayoutStore((state) => state.selectItem);
  const removeComponent = useLayoutStore((state) => state.removeComponent);
  const getComponentParent = useLayoutStore((state) => state.getComponentParent);
  
  const isSelected = selectedItemId === id;
  const isChildOfContainer = getComponentParent(id) !== null;

  const handleSelect = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    selectItem(id);
  }, [id, selectItem]);

  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // First select null to avoid selection issues
    selectItem(null);
    
    // Remove the component immediately
    removeComponent(id);
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} component removed`);
  }, [id, removeComponent, selectItem, type]);

  // Pass the id to all components so they can be properly selected
  const enhancedProps = { ...props, id };

  return (
    <motion.div
      className={`w-full h-full relative overflow-hidden ${
        isSelected ? 'ring-2 ring-primary z-10' : ''
      }`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      onClick={handleSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-component-id={id}
    >
      <div className="w-full h-full">
        <PreviewComponent type={type} props={enhancedProps} />
      </div>
      
      {/* Controls overlay - always visible when selected or hovered */}
      <div 
        className={`absolute top-1 right-1 p-1 transition-opacity ${
          isSelected || isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          onClick={handleRemove}
          className="w-7 h-7 rounded-full bg-destructive/90 hover:bg-destructive text-white flex items-center justify-center border border-border shadow-sm"
          aria-label="Remove component"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default GridItem;
