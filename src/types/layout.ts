
import { ReactElement } from 'react';
import { Layout } from 'react-grid-layout';

export type ComponentType = 
  | 'text'
  | 'heading'
  | 'card'
  | 'button'
  | 'image'
  | 'divider'
  | 'spacer'
  | 'table'
  | 'chart'
  | 'container';

export interface LayoutItem extends Layout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  static?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
}

export interface ComponentItem {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
}

export interface DraggableItemProps {
  id: string;
  type: ComponentType;
  title: string;
  icon: ReactElement;
  defaultProps: Record<string, any>;
  defaultW: number;
  defaultH: number;
  minW?: number;
  minH?: number;
}

export interface PreviewComponentProps {
  type: ComponentType;
  props: Record<string, any> & { id?: string };
}
