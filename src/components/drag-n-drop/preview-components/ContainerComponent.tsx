
import React, { useState } from 'react';
import useLayoutStore from '@/store/layoutStore';
import PreviewComponent from './index';
import { motion } from 'framer-motion';

interface ContainerComponentProps {
  background?: string;
  border?: boolean;
  padding?: string;
  rounded?: boolean;
  id?: string; // Used to identify this container
}

const ContainerComponent: React.FC<ContainerComponentProps> = ({
  background = 'bg-muted/30',
  border = true,
  padding = 'p-4',
  rounded = true,
  id
}) => {
  // Only try to render child components if we have an ID
  const childComponents = id 
    ? useLayoutStore((state) => state.getChildComponents(id))
    : [];
  
  const selectItem = useLayoutStore((state) => state.selectItem);
  const selectedItemId = useLayoutStore((state) => state.selectedItemId);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Handle drag events for adding components to container
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);

    if (!id) return; // Make sure we have an ID before proceeding

    try {
      const componentData = JSON.parse(e.dataTransfer.getData('component'));
      if (!componentData) return;

      const { type, defaultProps, defaultW, defaultH, minW, minH } = componentData;
      const addComponent = useLayoutStore.getState().addComponent;

      // Add to container - we don't need layout coordinates for nested components
      addComponent(
        type,
        {
          x: 0,
          y: 0,
          w: defaultW,
          h: defaultH,
          minW,
          minH,
        },
        defaultProps,
        id
      );
    } catch (error) {
      console.error('Error adding component to container:', error);
    }
  };
  
  // Handle click on container itself but not on its children
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target && id) {
      e.stopPropagation();
      selectItem(id);
    }
  };
  
  return (
    <div 
      className={`w-full h-full ${background} ${padding} ${
        border ? 'border border-border' : ''
      } ${rounded ? 'rounded-lg' : ''} ${
        selectedItemId === id ? 'ring-2 ring-primary' : ''
      } ${isDraggingOver ? 'ring-1 ring-primary/50 bg-primary/5' : ''} 
      relative overflow-auto transition-all`}
      data-container-id={id}
      onClick={handleContainerClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDraggingOver && (
        <motion.div 
          className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary/30 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {childComponents.length > 0 ? (
        <div className="w-full h-full grid grid-cols-12 gap-2">
          {childComponents.map(component => (
            <div 
              key={component.id} 
              className="col-span-12 sm:col-span-6 md:col-span-4 relative"
              // Prevent event propagation to container
              onClick={(e) => e.stopPropagation()}
            >
              <PreviewComponent 
                type={component.type} 
                props={{ ...component.props, id: component.id }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
          Drag components here
        </div>
      )}
    </div>
  );
};

export default ContainerComponent;
