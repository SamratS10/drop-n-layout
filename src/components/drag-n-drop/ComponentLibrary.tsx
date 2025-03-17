
import React from 'react';
import { motion } from 'framer-motion';
import { DraggableItemProps } from '@/types/layout';
import { 
  Text, 
  Heading, 
  Button, 
  Card, 
  ImageIcon, 
  Separator, 
  Space, 
  Table as TableIcon, 
  BarChart, 
  Box 
} from 'lucide-react';
import { Card as UICard, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DraggableComponent from './DraggableComponent';

const ComponentLibrary: React.FC = () => {
  const componentItems: DraggableItemProps[] = [
    {
      id: 'text',
      type: 'text',
      title: 'Text',
      icon: <Text className="w-5 h-5" />,
      defaultProps: { 
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.',
        color: 'text-foreground',
        size: 'text-base',
      },
      defaultW: 6,
      defaultH: 2,
      minW: 2,
      minH: 1,
    },
    {
      id: 'heading',
      type: 'heading',
      title: 'Heading',
      icon: <Heading className="w-5 h-5" />,
      defaultProps: { 
        text: 'Heading',
        level: 'h2',
        color: 'text-foreground',
      },
      defaultW: 6,
      defaultH: 1,
      minW: 2,
      minH: 1,
    },
    {
      id: 'card',
      type: 'card',
      title: 'Card',
      icon: <Card className="w-5 h-5" />,
      defaultProps: { 
        title: 'Card Title',
        content: 'Card content goes here',
        hasHeader: true,
      },
      defaultW: 4,
      defaultH: 4,
      minW: 3,
      minH: 3,
    },
    {
      id: 'button',
      type: 'button',
      title: 'Button',
      icon: <Button className="w-5 h-5" />,
      defaultProps: { 
        text: 'Button',
        variant: 'default',
        size: 'default',
      },
      defaultW: 2,
      defaultH: 1,
      minW: 2,
      minH: 1,
    },
    {
      id: 'image',
      type: 'image',
      title: 'Image',
      icon: <ImageIcon className="w-5 h-5" />,
      defaultProps: { 
        src: 'https://source.unsplash.com/random/800x600/?minimal',
        alt: 'Image',
        aspectRatio: '16/9',
      },
      defaultW: 4,
      defaultH: 4,
      minW: 2,
      minH: 2,
    },
    {
      id: 'divider',
      type: 'divider',
      title: 'Divider',
      icon: <Separator className="w-5 h-5" />,
      defaultProps: { 
        orientation: 'horizontal',
      },
      defaultW: 12,
      defaultH: 1,
      minW: 2,
      minH: 1,
    },
    {
      id: 'spacer',
      type: 'spacer',
      title: 'Spacer',
      icon: <Space className="w-5 h-5" />,
      defaultProps: { 
        height: '2rem',
      },
      defaultW: 12,
      defaultH: 1,
      minW: 1,
      minH: 1,
    },
    {
      id: 'table',
      type: 'table',
      title: 'Table',
      icon: <TableIcon className="w-5 h-5" />,
      defaultProps: { 
        rows: 3,
        columns: 3,
        headers: ['Header 1', 'Header 2', 'Header 3'],
        data: [
          ['Cell 1-1', 'Cell 1-2', 'Cell 1-3'],
          ['Cell 2-1', 'Cell 2-2', 'Cell 2-3'],
          ['Cell 3-1', 'Cell 3-2', 'Cell 3-3'],
        ],
      },
      defaultW: 6,
      defaultH: 4,
      minW: 3,
      minH: 3,
    },
    {
      id: 'chart',
      type: 'chart',
      title: 'Chart',
      icon: <BarChart className="w-5 h-5" />,
      defaultProps: { 
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Dataset 1',
              data: [12, 19, 3, 5, 2, 3],
            },
            {
              label: 'Dataset 2',
              data: [2, 3, 20, 5, 1, 4],
            },
          ],
        },
      },
      defaultW: 6,
      defaultH: 4,
      minW: 4,
      minH: 3,
    },
    {
      id: 'container',
      type: 'container',
      title: 'Container',
      icon: <Box className="w-5 h-5" />,
      defaultProps: { 
        background: 'bg-muted/30',
        border: true,
        padding: 'p-4',
        rounded: true,
      },
      defaultW: 6,
      defaultH: 6,
      minW: 3,
      minH: 3,
    },
  ];

  return (
    <UICard className="w-full h-full overflow-hidden">
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-base font-medium">Components</CardTitle>
      </CardHeader>
      <CardContent className="p-3 overflow-y-auto max-h-[calc(100vh-12rem)]">
        <div className="grid grid-cols-2 gap-2">
          {componentItems.map((item) => (
            <DraggableComponent key={item.id} {...item} />
          ))}
        </div>
      </CardContent>
    </UICard>
  );
};

export default ComponentLibrary;
