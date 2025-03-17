
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import useLayoutStore from '@/store/layoutStore';
import GridItem from './GridItem';
import { ComponentType } from '@/types/layout';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayout: React.FC = () => {
  const { 
    layout, 
    components, 
    updateLayout, 
    addComponent, 
    selectedItemId, 
    selectItem,
    setComponentParent 
  } = useLayoutStore();
  
  const gridRef = useRef<HTMLDivElement>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isDraggingOverContainer, setIsDraggingOverContainer] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
    
    // Check if we're dragging over a container
    const element = e.target as HTMLElement;
    const containerElement = element.closest('[data-container-id]');
    const containerId = containerElement?.getAttribute('data-container-id');
    
    if (containerId) {
      setIsDraggingOverContainer(containerId);
    } else {
      setIsDraggingOverContainer(null);
    }
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDraggingOver(false);
    setIsDraggingOverContainer(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    
    try {
      const componentData = JSON.parse(e.dataTransfer.getData('component'));
      
      if (!componentData) return;

      const { type, defaultProps, defaultW, defaultH, minW, minH } = componentData;
      
      // Find the container element that we're dropping into
      const element = e.target as HTMLElement;
      const containerElement = element.closest('[data-container-id]');
      const containerId = containerElement?.getAttribute('data-container-id');
      
      // Handle drop in container vs grid
      if (containerId) {
        // Add to container - we don't need layout coordinates for nested components
        addComponent(
          type as ComponentType,
          {
            x: 0,
            y: 0,
            w: defaultW,
            h: defaultH,
            minW,
            minH,
          },
          defaultProps,
          containerId
        );
        toast.success(`Added ${type} to container`);
      } else if (gridRef.current) {
        // Add to main grid with coordinates
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
        toast.success(`Added ${type} component`);
      }
      
      setIsDraggingOverContainer(null);
    } catch (error) {
      console.error('Error adding component:', error);
      toast.error('Failed to add component');
    }
  }, [addComponent]);

  const handleLayoutChange = useCallback((currentLayout: Layout[]) => {
    updateLayout(currentLayout);
  }, [updateLayout]);

  // Add body click handler to deselect
  useEffect(() => {
    const handleBodyClick = (e: MouseEvent) => {
      if (gridRef.current && !gridRef.current.contains(e.target as Node)) {
        selectItem(null);
      }
    };

    document.body.addEventListener('click', handleBodyClick);
    
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, [selectItem]);

  // Filter to only show components without a parent (top-level)
  const topLevelComponents = components.filter(component => {
    const hasParent = useLayoutStore.getState().getComponentParent(component.id) !== null;
    return !hasParent;
  });

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
          className={`absolute inset-0 bg-primary/5 border-2 border-dashed ${
            isDraggingOverContainer ? 'border-success/50' : 'border-primary/30'
          } z-10 pointer-events-none`}
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
        {topLevelComponents.map((component) => (
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
