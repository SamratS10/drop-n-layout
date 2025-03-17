
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
  // Set default text for components that require it
  switch (type) {
    case 'text':
      return <Text text={props.text || 'Text'} color={props.color} size={props.size} />;
    case 'heading':
      return <Heading text={props.text || 'Heading'} level={props.level} color={props.color} />;
    case 'card':
      return <CardComponent 
        title={props.title} 
        content={props.content} 
        hasHeader={props.hasHeader} 
      />;
    case 'button':
      return <ButtonComponent 
        text={props.text || 'Button'} 
        variant={props.variant} 
        size={props.size} 
      />;
    case 'image':
      return <ImageComponent 
        src={props.src || 'https://source.unsplash.com/random/800x600/?minimal'} 
        alt={props.alt || 'Image'} 
        aspectRatio={props.aspectRatio} 
      />;
    case 'divider':
      return <DividerComponent orientation={props.orientation} />;
    case 'spacer':
      return <SpacerComponent height={props.height} />;
    case 'table':
      return <TableComponent 
        rows={props.rows} 
        columns={props.columns} 
        headers={props.headers} 
        data={props.data} 
      />;
    case 'chart':
      return <ChartComponent 
        type={props.type} 
        data={props.data || {
          labels: ['Jan', 'Feb', 'Mar'],
          datasets: [{ label: 'Data', data: [3, 6, 9] }]
        }} 
      />;
    case 'container':
      return <ContainerComponent 
        background={props.background} 
        border={props.border} 
        padding={props.padding} 
        rounded={props.rounded} 
      />;
    default:
      return <div>Unknown Component Type</div>;
  }
};

export default PreviewComponent;
