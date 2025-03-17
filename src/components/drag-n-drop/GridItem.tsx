
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
    removeComponent(id);
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} component removed`);
  }, [id, removeComponent, type]);

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
        <PreviewComponent type={type} props={enhancedProps} />
      </div>
      
      {/* Controls overlay */}
      <div className={`absolute top-0 right-0 p-1 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
        <button
          onClick={handleRemove}
          className="w-7 h-7 rounded-full bg-destructive/90 hover:bg-destructive text-white flex items-center justify-center border border-border backdrop-blur-sm"
          aria-label="Remove component"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default GridItem;
