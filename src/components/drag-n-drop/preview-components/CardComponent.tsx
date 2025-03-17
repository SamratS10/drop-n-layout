
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CardComponentProps {
  title?: string;
  content?: string;
  hasHeader?: boolean;
}

const CardComponent: React.FC<CardComponentProps> = ({ 
  title = 'Card Title', 
  content = 'Card content goes here', 
  hasHeader = true 
}) => {
  return (
    <Card className="w-full h-full overflow-hidden">
      {hasHeader && (
        <CardHeader className="p-4">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={hasHeader ? 'p-4 pt-0' : 'p-4'}>
        {content}
      </CardContent>
    </Card>
  );
};

export default CardComponent;
