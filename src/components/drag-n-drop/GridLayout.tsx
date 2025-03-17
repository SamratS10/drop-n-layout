
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import useLayoutStore from '@/store/layoutStore';
import GridItem from './GridItem';
import { ComponentType } from '@/types/layout';
import { motion } from 'framer-motion';

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayout: React.FC = () => {
  const { layout, components, updateLayout, addComponent } = useLayoutStore();
  const gridRef = useRef<HTMLDivElement>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDraggingOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);

    try {
      const componentData = JSON.parse(e.dataTransfer.getData('component'));
      
      if (!componentData) return;

      const { type, defaultProps, defaultW, defaultH, minW, minH } = componentData;

      // Calculate position within the grid
      if (gridRef.current) {
        const gridRect = gridRef.current.getBoundingClientRect();
        const x = Math.floor((e.clientX - gridRect.left) / 100); // 100px per column (approx)
        const y = Math.floor((e.clientY - gridRect.top) / 100); // 100px per row (approx)

        // Add the component at the calculated position
        addComponent(
          type as ComponentType,
          {
            x: Math.max(0, Math.min(x, 12 - defaultW)),
            y: Math.max(0, y),
            w: defaultW,
            h: defaultH,
            minW,
            minH,
          },
          defaultProps
        );
      }
    } catch (error) {
      console.error('Error adding component:', error);
    }
  }, [addComponent]);

  const handleLayoutChange = useCallback((currentLayout: Layout[]) => {
    updateLayout(currentLayout);
  }, [updateLayout]);

  // Add body click handler to deselect
  useEffect(() => {
    const selectItem = useLayoutStore.getState().selectItem;
    
    const handleBodyClick = (e: MouseEvent) => {
      if (gridRef.current && !gridRef.current.contains(e.target as Node)) {
        selectItem(null);
      }
    };

    document.body.addEventListener('click', handleBodyClick);
    
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

  return (
    <div 
      ref={gridRef}
      className="w-full h-full relative border rounded-md overflow-auto transition-all"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDraggingOver && (
        <motion.div 
          className="absolute inset-0 bg-primary/5 border-2 border-dashed border-primary/30 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        />
      )}
      
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
        rowHeight={60}
        containerPadding={[10, 10]}
        margin={[10, 10]}
        onLayoutChange={handleLayoutChange}
        useCSSTransforms={true}
        compactType="vertical"
        preventCollision={false}
      >
        {components.map((component) => (
          <div key={component.id}>
            <GridItem component={component} />
          </div>
        ))}
      </ResponsiveGridLayout>
      
      {components.length === 0 && !isDraggingOver && (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          Drag and drop components here
        </div>
      )}
    </div>
  );
};

export default GridLayout;
