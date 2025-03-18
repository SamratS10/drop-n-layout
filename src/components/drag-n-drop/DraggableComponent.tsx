
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

  // Make component draggable both with react-dnd and for HTML5 drag events
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    // Set component data for dropping
    event.dataTransfer.setData('component', JSON.stringify({
      type,
      defaultProps,
      defaultW,
      defaultH,
      minW,
      minH,
    }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <motion.div
      ref={drag}
      draggable
      onDragStart={handleDragStart}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
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
