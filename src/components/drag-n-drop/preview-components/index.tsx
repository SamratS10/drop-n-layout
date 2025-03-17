
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

const PreviewComponent: React.FC<PreviewComponentProps> = ({ type, props }) => {
  switch (type) {
    case 'text':
      return <Text {...props} />;
    case 'heading':
      return <Heading {...props} />;
    case 'card':
      return <CardComponent {...props} />;
    case 'button':
      return <ButtonComponent {...props} />;
    case 'image':
      return <ImageComponent {...props} />;
    case 'divider':
      return <DividerComponent {...props} />;
    case 'spacer':
      return <SpacerComponent {...props} />;
    case 'table':
      return <TableComponent {...props} />;
    case 'chart':
      return <ChartComponent {...props} />;
    case 'container':
      return <ContainerComponent {...props} />;
    default:
      return <div>Unknown Component Type</div>;
  }
};

export default PreviewComponent;
