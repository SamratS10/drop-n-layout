
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { DraggableItemProps } from '@/types/layout';
import useLayoutStore from '@/store/layoutStore';

const DraggableComponent: React.FC<DraggableItemProps> = ({
  id,
  type,
  title,
  icon,
  defaultProps,
  defaultW,
  defaultH,
  minW,
  minH,
}) => {
  const addComponent = useLayoutStore((state) => state.addComponent);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('component', JSON.stringify({
      type,
      defaultProps,
      defaultW,
      defaultH,
      minW,
      minH,
    }));
    
    // Add some drag effect
    if (itemRef.current) {
      itemRef.current.classList.add('dragging');
    }
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (itemRef.current) {
      itemRef.current.classList.remove('dragging');
    }
  };

  return (
    <motion.div
      ref={itemRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="component-item flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/30 bg-card hover:bg-card/80 cursor-grab transition-all duration-200 shadow-sm hover:shadow"
    >
      <div className="flex-shrink-0 rounded-md w-8 h-8 bg-primary/10 text-primary flex items-center justify-center">
        {icon}
      </div>
      <span className="text-sm font-medium">{title}</span>
    </motion.div>
  );
};

export default DraggableComponent;
