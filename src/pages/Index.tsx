
import React from 'react';
import { motion } from 'framer-motion';
import ComponentLibrary from '@/components/drag-n-drop/ComponentLibrary';
import GridLayout from '@/components/drag-n-drop/GridLayout';
import PropertyEditor from '@/components/drag-n-drop/PropertyEditor';
import Toolbar from '@/components/drag-n-drop/Toolbar';

const LayoutBuilder: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border-b bg-card/60 backdrop-blur-md sticky top-0 z-10"
      >
        <div className="container mx-auto py-4 px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-medium">Layout Builder</h1>
            <Toolbar />
          </div>
        </div>
      </motion.header>
      
      {/* Main Content */}
      <div className="flex-1 container mx-auto p-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
          {/* Component Library */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="col-span-12 md:col-span-3 h-full"
          >
            <ComponentLibrary />
          </motion.div>
          
          {/* Grid Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="col-span-12 md:col-span-6 h-full"
          >
            <GridLayout />
          </motion.div>
          
          {/* Property Editor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="col-span-12 md:col-span-3 h-full"
          >
            <PropertyEditor />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LayoutBuilder;
