
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Clock, Package, Truck, CheckCircle, AlertCircle, User, MapPin, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { formatCurrency, formatLongDate } from '@/utils/formatters';
import { Order } from '@/store/slices/ordersSlice';

// Order status styles
const statusStyles = {
  Delivered: "bg-green-100 text-green-800 border-green-200",
  Processing: "bg-blue-100 text-blue-800 border-blue-200",
  Shipped: "bg-purple-100 text-purple-800 border-purple-200",
  Cancelled: "bg-red-100 text-red-800 border-red-200",
};

const statusIcons = {
  Processing: Clock,
  Shipped: Truck,
  Delivered: CheckCircle,
  Cancelled: AlertCircle,
};

interface OrderDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null; 
  onStatusChange: (orderId: string, newStatus: string) => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  open,
  onOpenChange,
  order,
  onStatusChange,
}) => {
  const [status, setStatus] = useState(order?.status || 'Processing');
  const { toast } = useToast();

  // Update local status when order changes
  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  if (!order) return null;

  const StatusIcon = statusIcons[status as keyof typeof statusIcons] || Package;

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    onStatusChange(order.id, newStatus);
    toast({
      title: "Order status updated",
      description: `Order #${order.id} is now ${newStatus}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Order #{order.id}</span>
            <Badge 
              className={cn(
                "ml-2 text-xs", 
                statusStyles[status as keyof typeof statusStyles]
              )}
            >
              {status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Placed on {formatLongDate(order.date)}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 sm:col-span-2">
              <div className="font-medium mb-2 flex items-center gap-1">
                <User className="h-4 w-4" /> Customer
              </div>
              <p>{order.customer}</p>
              <p className="text-sm text-muted-foreground">{order.email || 'customer@example.com'}</p>
            </div>
            <div className="col-span-4 sm:col-span-2">
              <div className="font-medium mb-2 flex items-center gap-1">
                <MapPin className="h-4 w-4" /> Shipping Address
              </div>
              <p className="text-sm">
                123 Main St<br />
                Apt 4B<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Order Items</h3>
            <div className="space-y-3">
              {(order.items || [
                { name: "Product 1", quantity: 2, price: 29.99 },
                { name: "Product 2", quantity: 1, price: 49.99 }
              ]).map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p>{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-medium mb-2 flex items-center gap-1">
                <CreditCard className="h-4 w-4" /> Payment
              </div>
              <p className="text-sm">
                Amount: {formatCurrency(order.amount)}<br />
                Method: Credit Card<br />
                Status: Paid
              </p>
            </div>
            <div>
              <div className="font-medium mb-2">Update Status</div>
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button 
            className="gap-1"
            onClick={() => {
              toast({
                title: "Order actions",
                description: "Feature coming soon: Print order details",
              });
            }}
          >
            <Package className="h-4 w-4" /> Generate Invoice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
