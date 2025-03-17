
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy, Check } from 'lucide-react';
import useLayoutStore from '@/store/layoutStore';

const JsonOutput: React.FC = () => {
  const getLayoutJSON = useLayoutStore((state) => state.getLayoutJSON);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const json = getLayoutJSON();
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View JSON</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Layout JSON</DialogTitle>
        </DialogHeader>
        <div className="relative mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="absolute right-2 top-2"
            onClick={handleCopy}
          >
            {copied ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="h-4 w-4" />
              </motion.div>
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <ScrollArea className="h-[300px] rounded-md border">
            <pre className="p-4 text-sm bg-muted/30 overflow-auto">
              {getLayoutJSON()}
            </pre>
          </ScrollArea>
        </div>
        <DialogClose asChild>
          <Button variant="outline" className="mt-4">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default JsonOutput;
