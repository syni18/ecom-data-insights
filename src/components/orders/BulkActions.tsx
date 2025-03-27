
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { ArrowDown, Check, Download, Printer, Trash2, Truck } from 'lucide-react';

interface BulkActionsProps {
  selectedOrders: string[];
  onClearSelection: () => void;
  onUpdateStatus: (orderIds: string[], status: string) => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({ 
  selectedOrders, 
  onClearSelection,
  onUpdateStatus
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (selectedOrders.length === 0) return null;

  const handleBulkDelete = () => {
    toast.success(`${selectedOrders.length} orders have been deleted`);
    setShowDeleteDialog(false);
    onClearSelection();
  };

  const handleBulkShip = () => {
    onUpdateStatus(selectedOrders, 'Shipped');
    toast.success(`${selectedOrders.length} orders marked as shipped`);
  };

  const handleBulkDeliver = () => {
    onUpdateStatus(selectedOrders, 'Delivered');
    toast.success(`${selectedOrders.length} orders marked as delivered`);
  };

  const handleBulkExport = () => {
    toast.success(`${selectedOrders.length} orders exported`);
  };

  const handleBulkPrint = () => {
    toast.success(`Printing ${selectedOrders.length} order documents`);
  };

  return (
    <>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10 bg-background border rounded-lg shadow-lg p-3 flex items-center gap-2 animate-fade-in">
        <span className="bg-primary text-primary-foreground text-sm font-medium rounded-full h-6 min-w-6 flex items-center justify-center px-2 mr-1">
          {selectedOrders.length}
        </span>
        
        <Button size="sm" variant="outline" onClick={onClearSelection}>
          Clear
        </Button>
        
        <Button 
          size="sm" 
          variant="default" 
          className="gap-1"
          onClick={handleBulkShip}
        >
          <Truck className="h-4 w-4" /> Ship
        </Button>
        
        <Button 
          size="sm" 
          variant="default" 
          className="gap-1"
          onClick={handleBulkDeliver}
        >
          <Check className="h-4 w-4" /> Mark Delivered
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline" className="gap-1">
              More Actions <ArrowDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleBulkExport} className="gap-2">
              <Download className="h-4 w-4" /> Export Orders
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleBulkPrint} className="gap-2">
              <Printer className="h-4 w-4" /> Print Documents
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setShowDeleteDialog(true)} 
              className="text-destructive gap-2"
            >
              <Trash2 className="h-4 w-4" /> Delete Orders
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedOrders.length} orders?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The selected orders will be permanently deleted from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleBulkDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BulkActions;
