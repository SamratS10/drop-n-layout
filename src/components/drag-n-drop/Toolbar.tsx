
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogClose 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Save, Upload, Trash, Download } from 'lucide-react';
import { toast } from 'sonner';
import useLayoutStore from '@/store/layoutStore';
import JsonOutput from './JsonOutput';

const Toolbar: React.FC = () => {
  const { getLayoutJSON, setLayoutFromJSON, resetLayout } = useLayoutStore();
  const [importJson, setImportJson] = useState('');

  const handleReset = () => {
    resetLayout();
    toast.success('Layout reset successfully');
  };

  const handleImport = () => {
    try {
      setLayoutFromJSON(importJson);
      toast.success('Layout imported successfully');
      setImportJson('');
    } catch (error) {
      toast.error('Failed to import layout: Invalid JSON format');
    }
  };

  const handleDownload = () => {
    const json = getLayoutJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'layout.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Layout downloaded successfully');
  };

  return (
    <div className="flex items-center gap-2">
      <JsonOutput />
      
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Layout JSON</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={importJson}
              onChange={(e) => setImportJson(e.target.value)}
              placeholder="Paste your layout JSON here..."
              className="min-h-[200px]"
            />
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleImport}>Import</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      
      <Button variant="outline" onClick={handleDownload}>
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>
      
      <Button variant="outline" className="ml-auto text-destructive" onClick={handleReset}>
        <Trash className="h-4 w-4 mr-2" />
        Reset
      </Button>
    </div>
  );
};

export default Toolbar;
