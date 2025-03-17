
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

const PreviewComponent: React.FC<PreviewComponentProps> = ({ type, props = {} }) => {
  // Extract the id from props for use in all components
  const { id, ...otherProps } = props;

  // Set default text for components that require it
  switch (type) {
    case 'text':
      return <Text text={otherProps.text || 'Text'} color={otherProps.color} size={otherProps.size} />;
    case 'heading':
      return <Heading text={otherProps.text || 'Heading'} level={otherProps.level} color={otherProps.color} />;
    case 'card':
      return <CardComponent 
        title={otherProps.title} 
        content={otherProps.content} 
        hasHeader={otherProps.hasHeader} 
      />;
    case 'button':
      return <ButtonComponent 
        text={otherProps.text || 'Button'} 
        variant={otherProps.variant} 
        size={otherProps.size} 
      />;
    case 'image':
      return <ImageComponent 
        src={otherProps.src || 'https://source.unsplash.com/random/800x600/?minimal'} 
        alt={otherProps.alt || 'Image'} 
        aspectRatio={otherProps.aspectRatio} 
      />;
    case 'divider':
      return <DividerComponent orientation={otherProps.orientation} />;
    case 'spacer':
      return <SpacerComponent height={otherProps.height} />;
    case 'table':
      return <TableComponent 
        rows={otherProps.rows} 
        columns={otherProps.columns} 
        headers={otherProps.headers} 
        data={otherProps.data} 
      />;
    case 'chart':
      return <ChartComponent 
        type={otherProps.type} 
        data={otherProps.data || {
          labels: ['Jan', 'Feb', 'Mar'],
          datasets: [{ label: 'Data', data: [3, 6, 9] }]
        }} 
      />;
    case 'container':
      return <ContainerComponent 
        id={id}
        background={otherProps.background} 
        border={otherProps.border} 
        padding={otherProps.padding} 
        rounded={otherProps.rounded} 
      />;
    default:
      return <div>Unknown Component Type</div>;
  }
};

export default PreviewComponent;
