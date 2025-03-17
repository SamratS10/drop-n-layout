
import React from 'react';
import { Button } from '@/components/ui/button';

interface ButtonComponentProps {
  text: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ 
  text = 'Button', 
  variant = 'default', 
  size = 'default' 
}) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Button variant={variant} size={size}>{text}</Button>
    </div>
  );
};

export default ButtonComponent;
