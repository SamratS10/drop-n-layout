
import React from 'react';
import useLayoutStore from '@/store/layoutStore';
import PreviewComponent from './index';

interface ContainerComponentProps {
  background?: string;
  border?: boolean;
  padding?: string;
  rounded?: boolean;
  id?: string; // Added to identify this container
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
      } relative overflow-auto`}
      data-container-id={id}
      onClick={handleContainerClick}
    >
      {childComponents.length > 0 ? (
        <div className="w-full h-full">
          {childComponents.map(component => (
            <div 
              key={component.id} 
              className="mb-2 relative"
              // Don't propagate clicks on child component containers
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
          Container {id ? `(${id})` : ''} - Drag components here
        </div>
      )}
    </div>
  );
};

export default ContainerComponent;
