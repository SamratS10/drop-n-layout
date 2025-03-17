
import React from 'react';
import { useDrag } from 'react-dnd';
import { motion, PanInfo } from 'framer-motion';
import { ComponentType, DraggableItemProps } from '@/types/layout';
import { Card, CardContent } from '@/components/ui/card';

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
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COMPONENT',
    item: {
      id,
      type,
      defaultProps,
      defaultW,
      defaultH,
      minW,
      minH,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // Handle dragging with framer-motion for better visual feedback
  const handleDragStart = () => {
    // This is used as a visual indicator only
    // The actual drag logic is handled by react-dnd
  };

  // These handlers need to accept the correct types from framer-motion
  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Visual feedback only
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Reset any visual states
  };

  return (
    <motion.div
      ref={drag}
      draggable
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onDragStart={handleDragStart}
      onPan={handleDrag}
      onPanEnd={handleDragEnd}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="cursor-grab active:cursor-grabbing"
    >
      <Card className="mb-2 hover:border-primary/50 transition-colors">
        <CardContent className="p-3 flex items-center gap-2">
          <div className="text-muted-foreground">
            {icon}
          </div>
          <span className="text-sm font-medium">{title}</span>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DraggableComponent;
