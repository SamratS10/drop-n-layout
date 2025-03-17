
import React from 'react';
import { PreviewComponentProps } from '@/types/layout';
import Text from './Text';
import Heading from './Heading';
import CardComponent from './CardComponent';
import ButtonComponent from './ButtonComponent';
import ImageComponent from './ImageComponent';
import DividerComponent from './DividerComponent';
import SpacerComponent from './SpacerComponent';
import TableComponent from './TableComponent';
import ChartComponent from './ChartComponent';
import ContainerComponent from './ContainerComponent';
import useLayoutStore from '@/store/layoutStore';

const PreviewComponent: React.FC<PreviewComponentProps> = ({ type, props = {} }) => {
  // Extract the id from props for use in all components
  const { id, ...otherProps } = props;
  
  // Access the select function from the store
  const selectItem = useLayoutStore((state) => state.selectItem);
  
  // Handle click on any component to select it
  const handleComponentClick = (e: React.MouseEvent) => {
    if (id) {
      e.stopPropagation();
      selectItem(id);
    }
  };
  
  // Wrap all components in a clickable div to handle selection
  const renderWrappedComponent = (component: React.ReactNode) => {
    return (
      <div 
        className="w-full h-full" 
        onClick={handleComponentClick}
        data-component-id={id}
      >
        {component}
      </div>
    );
  };

  // Set default text for components that require it
  switch (type) {
    case 'text':
      return renderWrappedComponent(
        <Text text={otherProps.text || 'Text'} color={otherProps.color} size={otherProps.size} />
      );
    case 'heading':
      return renderWrappedComponent(
        <Heading text={otherProps.text || 'Heading'} level={otherProps.level} color={otherProps.color} />
      );
    case 'card':
      return renderWrappedComponent(
        <CardComponent 
          title={otherProps.title} 
          content={otherProps.content} 
          hasHeader={otherProps.hasHeader} 
        />
      );
    case 'button':
      return renderWrappedComponent(
        <ButtonComponent 
          text={otherProps.text || 'Button'} 
          variant={otherProps.variant} 
          size={otherProps.size} 
        />
      );
    case 'image':
      return renderWrappedComponent(
        <ImageComponent 
          src={otherProps.src || 'https://source.unsplash.com/random/800x600/?minimal'} 
          alt={otherProps.alt || 'Image'} 
          aspectRatio={otherProps.aspectRatio} 
        />
      );
    case 'divider':
      return renderWrappedComponent(
        <DividerComponent orientation={otherProps.orientation} />
      );
    case 'spacer':
      return renderWrappedComponent(
        <SpacerComponent height={otherProps.height} />
      );
    case 'table':
      return renderWrappedComponent(
        <TableComponent 
          rows={otherProps.rows} 
          columns={otherProps.columns} 
          headers={otherProps.headers} 
          data={otherProps.data} 
        />
      );
    case 'chart':
      return renderWrappedComponent(
        <ChartComponent 
          type={otherProps.type} 
          data={otherProps.data || {
            labels: ['Jan', 'Feb', 'Mar'],
            datasets: [{ label: 'Data', data: [3, 6, 9] }]
          }} 
        />
      );
    case 'container':
      // Container is special - we don't wrap it since it handles its own click events
      return (
        <ContainerComponent 
          id={id}
          background={otherProps.background} 
          border={otherProps.border} 
          padding={otherProps.padding} 
          rounded={otherProps.rounded} 
        />
      );
    default:
      return renderWrappedComponent(<div>Unknown Component Type</div>);
  }
};

export default PreviewComponent;
