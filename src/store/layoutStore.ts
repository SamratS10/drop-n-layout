
import { create } from 'zustand';
import { Layout } from 'react-grid-layout';
import { ComponentItem, ComponentType, LayoutItem } from '@/types/layout';
import { nanoid } from 'nanoid';

interface LayoutState {
  layout: Layout;
  components: ComponentItem[];
  nextId: number;
  selectedItemId: string | null;

  // Actions
  addComponent: (type: ComponentType, layout: LayoutItem, props: Record<string, any>) => void;
  updateLayout: (newLayout: Layout) => void;
  updateComponent: (id: string, props: Record<string, any>) => void;
  removeComponent: (id: string) => void;
  selectItem: (id: string | null) => void;
  getLayoutJSON: () => string;
  setLayoutFromJSON: (jsonStr: string) => void;
  resetLayout: () => void;
}

const useLayoutStore = create<LayoutState>((set, get) => ({
  layout: [],
  components: [],
  nextId: 1,
  selectedItemId: null,

  addComponent: (type, layout, props) => {
    const id = `item-${get().nextId}`;
    set((state) => ({
      layout: [...state.layout, { ...layout, i: id }],
      components: [...state.components, { id, type, props }],
      nextId: state.nextId + 1,
      selectedItemId: id,
    }));
  },

  updateLayout: (newLayout) => {
    set({ layout: newLayout });
  },

  updateComponent: (id, props) => {
    set((state) => ({
      components: state.components.map((component) =>
        component.id === id ? { ...component, props: { ...component.props, ...props } } : component
      ),
    }));
  },

  removeComponent: (id) => {
    set((state) => ({
      layout: state.layout.filter((item) => item.i !== id),
      components: state.components.filter((component) => component.id !== id),
      selectedItemId: state.selectedItemId === id ? null : state.selectedItemId,
    }));
  },

  selectItem: (id) => {
    set({ selectedItemId: id });
  },

  getLayoutJSON: () => {
    const state = get();
    return JSON.stringify({
      layout: state.layout,
      components: state.components,
    }, null, 2);
  },

  setLayoutFromJSON: (jsonStr) => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.layout && data.components) {
        set({
          layout: data.layout,
          components: data.components,
          nextId: Math.max(...data.components.map((c: ComponentItem) => 
            parseInt(c.id.replace('item-', ''), 10)
          ), 0) + 1,
        });
      }
    } catch (error) {
      console.error('Error parsing layout JSON:', error);
    }
  },

  resetLayout: () => {
    set({
      layout: [],
      components: [],
      nextId: 1,
      selectedItemId: null,
    });
  }
}));

export default useLayoutStore;
