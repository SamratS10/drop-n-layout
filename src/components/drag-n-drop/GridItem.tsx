
import React, { useCallback } from 'react';
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
  
  const selectedItemId = useLayoutStore((state) => state.selectedItemId);
  const selectItem = useLayoutStore((state) => state.selectItem);
  const removeComponent = useLayoutStore((state) => state.removeComponent);
  
  const isSelected = selectedItemId === id;

  const handleSelect = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    selectItem(id);
  }, [id, selectItem]);

  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Immediately select null to avoid any selection issues after deletion
    selectItem(null);
    
    // Small timeout to ensure the UI updates properly before removal
    setTimeout(() => {
      removeComponent(id);
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} component removed`);
    }, 10);
  }, [id, removeComponent, selectItem, type]);

  // Pass the id to ContainerComponent for nested components
  const enhancedProps = type === 'container' ? { ...props, id } : props;

  return (
    <motion.div
      className={`w-full h-full relative overflow-hidden group ${
        isSelected ? 'ring-2 ring-primary rounded-md' : ''
      }`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      onClick={handleSelect}
    >
      <div className="w-full h-full">
        <PreviewComponent type={type} props={{ ...enhancedProps, id }} />
      </div>
      
      {/* Controls overlay - make more prominent and always visible when selected */}
      <div 
        className={`absolute top-0 right-0 p-1 transition-opacity ${
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        <button
          onClick={handleRemove}
          className="w-7 h-7 rounded-full bg-destructive text-white flex items-center justify-center border border-border backdrop-blur-sm shadow-sm"
          aria-label="Remove component"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default GridItem;
