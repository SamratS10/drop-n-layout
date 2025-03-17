
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useLayoutStore from '@/store/layoutStore';
import { 
  Card, 
  CardContent,
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

const PropertyEditor: React.FC = () => {
  const { components, selectedItemId, updateComponent } = useLayoutStore();
  
  // If no item is selected, prompt the user to select one
  if (!selectedItemId) {
    return (
      <Card className="w-full h-full">
        <CardHeader className="px-4 py-3">
          <CardTitle className="text-base font-medium">Properties</CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-center text-muted-foreground">
          Select an item to edit its properties
        </CardContent>
      </Card>
    );
  }
  
  const selectedComponent = components.find(comp => comp.id === selectedItemId);
  
  if (!selectedComponent) {
    return null;
  }

  const { type, props } = selectedComponent;

  const handleChange = (key: string, value: any) => {
    // Make sure to prevent unnecessary re-renders
    if (props[key] !== value) {
      updateComponent(selectedItemId, { [key]: value });
    }
  };

  // Render property fields based on component type
  const renderPropertyFields = () => {
    switch (type) {
      case 'text':
        return (
          <>
            <div className="space-y-2 mb-4">
              <Label htmlFor="text">Text</Label>
              <Textarea 
                id="text"
                value={props.text || ''}
                onChange={(e) => handleChange('text', e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2 mb-4">
              <Label htmlFor="color">Color</Label>
              <Select 
                value={props.color || 'text-foreground'} 
                onValueChange={(value) => handleChange('color', value)}
              >
                <SelectTrigger id="color">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text-foreground">Default</SelectItem>
                  <SelectItem value="text-primary">Primary</SelectItem>
                  <SelectItem value="text-muted-foreground">Muted</SelectItem>
                  <SelectItem value="text-accent-foreground">Accent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 mb-4">
              <Label htmlFor="size">Size</Label>
              <Select 
                value={props.size || 'text-base'} 
                onValueChange={(value) => handleChange('size', value)}
              >
                <SelectTrigger id="size">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text-xs">Extra Small</SelectItem>
                  <SelectItem value="text-sm">Small</SelectItem>
                  <SelectItem value="text-base">Medium</SelectItem>
                  <SelectItem value="text-lg">Large</SelectItem>
                  <SelectItem value="text-xl">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
        
      case 'heading':
        return (
          <>
            <div className="space-y-2 mb-4">
              <Label htmlFor="text">Text</Label>
              <Input 
                id="text"
                value={props.text || ''}
                onChange={(e) => handleChange('text', e.target.value)}
              />
              <div className="mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleChange('text', props.text || 'My Custom Heading')}
                >
                  Apply Text
                </Button>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <Label htmlFor="level">Level</Label>
              <Select 
                value={props.level || 'h2'} 
                onValueChange={(value) => handleChange('level', value)}
              >
                <SelectTrigger id="level">
                  <SelectValue placeholder="Select heading level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h1">H1</SelectItem>
                  <SelectItem value="h2">H2</SelectItem>
                  <SelectItem value="h3">H3</SelectItem>
                  <SelectItem value="h4">H4</SelectItem>
                  <SelectItem value="h5">H5</SelectItem>
                  <SelectItem value="h6">H6</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 mb-4">
              <Label htmlFor="color">Color</Label>
              <Select 
                value={props.color || 'text-foreground'} 
                onValueChange={(value) => handleChange('color', value)}
              >
                <SelectTrigger id="color">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text-foreground">Default</SelectItem>
                  <SelectItem value="text-primary">Primary</SelectItem>
                  <SelectItem value="text-muted-foreground">Muted</SelectItem>
                  <SelectItem value="text-accent-foreground">Accent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
        
      case 'card':
        return (
          <>
            <div className="space-y-2 mb-4">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title"
                value={props.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </div>
            <div className="space-y-2 mb-4">
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content"
                value={props.content || ''}
                onChange={(e) => handleChange('content', e.target.value)}
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <Switch 
                id="hasHeader"
                checked={props.hasHeader !== false}
                onCheckedChange={(checked) => handleChange('hasHeader', checked)}
              />
              <Label htmlFor="hasHeader">Show Header</Label>
            </div>
          </>
        );
        
      case 'button':
        return (
          <>
            <div className="space-y-2 mb-4">
              <Label htmlFor="text">Text</Label>
              <Input 
                id="text"
                value={props.text || ''}
                onChange={(e) => handleChange('text', e.target.value)}
              />
            </div>
            <div className="space-y-2 mb-4">
              <Label htmlFor="variant">Variant</Label>
              <Select 
                value={props.variant || 'default'} 
                onValueChange={(value) => handleChange('variant', value)}
              >
                <SelectTrigger id="variant">
                  <SelectValue placeholder="Select variant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="destructive">Destructive</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="ghost">Ghost</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 mb-4">
              <Label htmlFor="size">Size</Label>
              <Select 
                value={props.size || 'default'} 
                onValueChange={(value) => handleChange('size', value)}
              >
                <SelectTrigger id="size">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                  <SelectItem value="icon">Icon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
        
      case 'image':
        return (
          <>
            <div className="space-y-2 mb-4">
              <Label htmlFor="src">Image URL</Label>
              <Input 
                id="src"
                value={props.src || ''}
                onChange={(e) => handleChange('src', e.target.value)}
              />
            </div>
            <div className="space-y-2 mb-4">
              <Label htmlFor="alt">Alt Text</Label>
              <Input 
                id="alt"
                value={props.alt || ''}
                onChange={(e) => handleChange('alt', e.target.value)}
              />
            </div>
            <div className="space-y-2 mb-4">
              <Label htmlFor="aspectRatio">Aspect Ratio</Label>
              <Select 
                value={props.aspectRatio || '16/9'} 
                onValueChange={(value) => handleChange('aspectRatio', value)}
              >
                <SelectTrigger id="aspectRatio">
                  <SelectValue placeholder="Select aspect ratio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16/9">16:9</SelectItem>
                  <SelectItem value="4/3">4:3</SelectItem>
                  <SelectItem value="1/1">1:1</SelectItem>
                  <SelectItem value="3/4">3:4</SelectItem>
                  <SelectItem value="9/16">9:16</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case 'divider':
        return (
          <div className="space-y-2 mb-4">
            <Label htmlFor="orientation">Orientation</Label>
            <Select 
              value={props.orientation || 'horizontal'} 
              onValueChange={(value) => handleChange('orientation', value)}
            >
              <SelectTrigger id="orientation">
                <SelectValue placeholder="Select orientation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="horizontal">Horizontal</SelectItem>
                <SelectItem value="vertical">Vertical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
        
      case 'spacer':
        return (
          <div className="space-y-2 mb-4">
            <Label htmlFor="height">Height</Label>
            <Select 
              value={props.height || '2rem'} 
              onValueChange={(value) => handleChange('height', value)}
            >
              <SelectTrigger id="height">
                <SelectValue placeholder="Select height" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1rem">Small (1rem)</SelectItem>
                <SelectItem value="2rem">Medium (2rem)</SelectItem>
                <SelectItem value="4rem">Large (4rem)</SelectItem>
                <SelectItem value="8rem">Extra Large (8rem)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
        
      case 'container':
        return (
          <>
            <div className="space-y-2 mb-4">
              <Label htmlFor="background">Background</Label>
              <Select 
                value={props.background || 'bg-muted/30'} 
                onValueChange={(value) => handleChange('background', value)}
              >
                <SelectTrigger id="background">
                  <SelectValue placeholder="Select background" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bg-transparent">Transparent</SelectItem>
                  <SelectItem value="bg-muted/30">Light Gray</SelectItem>
                  <SelectItem value="bg-primary/10">Primary Light</SelectItem>
                  <SelectItem value="bg-card">Card</SelectItem>
                  <SelectItem value="bg-accent">Accent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <Switch 
                id="border"
                checked={props.border !== false}
                onCheckedChange={(checked) => handleChange('border', checked)}
              />
              <Label htmlFor="border">Show Border</Label>
            </div>
            <div className="space-y-2 mb-4">
              <Label htmlFor="padding">Padding</Label>
              <Select 
                value={props.padding || 'p-4'} 
                onValueChange={(value) => handleChange('padding', value)}
              >
                <SelectTrigger id="padding">
                  <SelectValue placeholder="Select padding" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="p-0">None</SelectItem>
                  <SelectItem value="p-2">Small</SelectItem>
                  <SelectItem value="p-4">Medium</SelectItem>
                  <SelectItem value="p-6">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <Switch 
                id="rounded"
                checked={props.rounded !== false}
                onCheckedChange={(checked) => handleChange('rounded', checked)}
              />
              <Label htmlFor="rounded">Rounded Corners</Label>
            </div>
          </>
        );
        
      // Add more cases for other component types...
      
      default:
        return (
          <div className="text-muted-foreground py-4">
            No properties available for this component
          </div>
        );
    }
  };

  return (
    <Card className="w-full h-full overflow-hidden">
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-base font-medium">
          {type.charAt(0).toUpperCase() + type.slice(1)} Properties {selectedItemId ? `(${selectedItemId})` : ''}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {renderPropertyFields()}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default PropertyEditor;
