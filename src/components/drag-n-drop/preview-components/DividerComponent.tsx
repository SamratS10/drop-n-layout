
import React from 'react';
import { Separator } from '@/components/ui/separator';

interface DividerComponentProps {
  orientation?: 'horizontal' | 'vertical';
}

const DividerComponent: React.FC<DividerComponentProps> = ({ 
  orientation = 'horizontal' 
}) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Separator orientation={orientation} className={orientation === 'horizontal' ? 'w-full' : 'h-full'} />
    </div>
  );
};

export default DividerComponent;
