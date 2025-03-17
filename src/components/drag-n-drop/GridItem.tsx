
import React from 'react';
import { motion } from 'framer-motion';
import PreviewComponent from './preview-components';
import { ComponentItem } from '@/types/layout';
import useLayoutStore from '@/store/layoutStore';
import { X } from 'lucide-react';

interface GridItemProps {
  component: ComponentItem;
}

const GridItem: React.FC<GridItemProps> = ({ component }) => {
  const { id, type, props } = component;
  
  const selectedItemId = useLayoutStore((state) => state.selectedItemId);
  const selectItem = useLayoutStore((state) => state.selectItem);
  const removeComponent = useLayoutStore((state) => state.removeComponent);
  
  const isSelected = selectedItemId === id;

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectItem(id);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeComponent(id);
  };

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
        <PreviewComponent type={type} props={props} />
      </div>
      
      {/* Controls overlay */}
      <div className={`absolute top-0 right-0 p-1 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
        <button
          onClick={handleRemove}
          className="w-6 h-6 rounded-full bg-card/80 hover:bg-destructive text-muted-foreground hover:text-white flex items-center justify-center border border-border backdrop-blur-sm"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
};

export default GridItem;
