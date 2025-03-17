
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
  
  return (
    <div 
      className={`w-full h-full ${background} ${padding} ${
        border ? 'border border-border' : ''
      } ${rounded ? 'rounded-lg' : ''} relative overflow-auto`}
      data-container-id={id}
    >
      {childComponents.length > 0 ? (
        <div className="w-full h-full">
          {childComponents.map(component => (
            <div key={component.id} className="mb-2">
              <PreviewComponent 
                type={component.type} 
                props={{ ...component.props, id: component.id }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
          Container {id ? `(${id})` : ''}
        </div>
      )}
    </div>
  );
};

export default ContainerComponent;
