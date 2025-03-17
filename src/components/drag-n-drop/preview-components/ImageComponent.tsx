
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ImageComponentProps {
  src: string;
  alt: string;
  aspectRatio?: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ 
  src = 'https://source.unsplash.com/random/800x600/?minimal', 
  alt = 'Image', 
  aspectRatio = '16/9' 
}) => {
  // Convert string ratio like "16/9" to number
  const [numerator, denominator] = aspectRatio.split('/').map(Number);
  const ratio = numerator / denominator;

  return (
    <div className="w-full h-full flex items-center justify-center p-1">
      <AspectRatio ratio={ratio} className="overflow-hidden rounded-md">
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full transition-all"
        />
      </AspectRatio>
    </div>
  );
};

export default ImageComponent;
