
import { create } from 'zustand';
import { Layout } from 'react-grid-layout';
import { ComponentItem, ComponentType, LayoutItem } from '@/types/layout';
import { nanoid } from 'nanoid';

interface LayoutState {
  layout: Layout[];
  components: ComponentItem[];
  nextId: number;
  selectedItemId: string | null;
  containerParents: Record<string, string | null>; // Track parent-child relationships

  // Actions
  addComponent: (type: ComponentType, layoutItem: Omit<LayoutItem, "i">, props: Record<string, any>, parentId?: string | null) => void;
  updateLayout: (newLayout: Layout[]) => void;
  updateComponent: (id: string, props: Record<string, any>) => void;
  removeComponent: (id: string) => void;
  selectItem: (id: string | null) => void;
  getLayoutJSON: () => string;
  setLayoutFromJSON: (jsonStr: string) => void;
  resetLayout: () => void;
  setComponentParent: (childId: string, parentId: string | null) => void;
  getComponentParent: (childId: string) => string | null;
  getChildComponents: (parentId: string) => ComponentItem[];
}

const useLayoutStore = create<LayoutState>((set, get) => ({
  layout: [],
  components: [],
  nextId: 1,
  selectedItemId: null,
  containerParents: {},

  addComponent: (type, layoutItem, props, parentId = null) => {
    const id = `item-${get().nextId}`;
    set((state) => {
      // Create a new layout item only if this is not a child component of a container
      const newLayout = parentId 
        ? [...state.layout] 
        : [...state.layout, { ...layoutItem, i: id }];
      
      const newState = {
        layout: newLayout,
        components: [...state.components, { id, type, props }],
        nextId: state.nextId + 1,
        selectedItemId: id, // Select the new component
        containerParents: { ...state.containerParents }
      };
      
      // If parent is specified, set the parent-child relationship
      if (parentId) {
        newState.containerParents[id] = parentId;
      }
      
      return newState;
    });
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
    // Find child components to remove as well
    const childrenToRemove = get().getChildComponents(id).map(child => child.id);
    
    set((state) => {
      // Create new objects to ensure state updates properly
      const newComponents = state.components.filter(component => 
        component.id !== id && !childrenToRemove.includes(component.id)
      );
      
      const newLayout = state.layout.filter(item => 
        item.i !== id && !childrenToRemove.includes(item.i)
      );
      
      // Remove parent-child relationships for deleted components
      const newContainerParents = { ...state.containerParents };
      delete newContainerParents[id];
      childrenToRemove.forEach(childId => {
        delete newContainerParents[childId];
      });
      
      return {
        layout: newLayout,
        components: newComponents,
        selectedItemId: state.selectedItemId === id || childrenToRemove.includes(state.selectedItemId || '') 
          ? null 
          : state.selectedItemId,
        containerParents: newContainerParents
      };
    });
  },

  selectItem: (id) => {
    set({ selectedItemId: id });
  },

  getLayoutJSON: () => {
    const state = get();
    return JSON.stringify({
      layout: state.layout,
      components: state.components,
      containerParents: state.containerParents
    }, null, 2);
  },

  setLayoutFromJSON: (jsonStr) => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.layout && data.components) {
        set({
          layout: data.layout,
          components: data.components,
          containerParents: data.containerParents || {},
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
      containerParents: {}
    });
  },
  
  setComponentParent: (childId, parentId) => {
    set((state) => ({
      containerParents: {
        ...state.containerParents,
        [childId]: parentId
      }
    }));
  },
  
  getComponentParent: (childId) => {
    return get().containerParents[childId] || null;
  },
  
  getChildComponents: (parentId) => {
    const children: ComponentItem[] = [];
    const { components, containerParents } = get();
    
    // First level children
    const directChildren = components.filter(c => 
      containerParents[c.id] === parentId
    );
    
    children.push(...directChildren);
    
    // Don't need recursive lookup for now to avoid circular references
    // If needed, we can implement a more sophisticated algorithm
    
    return children;
  }
}));

export default useLayoutStore;
