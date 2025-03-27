
import React, { useState, useEffect } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { 
  ArrowDownWideNarrow, 
  ArrowUpWideNarrow, 
  ChevronDown, 
  Download, 
  Eye, 
  Filter, 
  Grid3X3, 
  LayoutList, 
  Printer, 
  Search, 
  SlidersHorizontal 
} from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { formatCurrency, formatDate, debounce } from '@/utils/formatters';
import OrderDetails from '@/components/orders/OrderDetails';
import BulkActions from '@/components/orders/BulkActions';

// Order status styles
const statusStyles = {
  Delivered: "bg-green-100 text-green-800 border-green-200",
  Processing: "bg-blue-100 text-blue-800 border-blue-200",
  Shipped: "bg-purple-100 text-purple-800 border-purple-200",
  Cancelled: "bg-red-100 text-red-800 border-red-200",
};

const Orders = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  
  const {
    orders,
    loading,
    error,
    selectedOrderIds,
    orderBy,
    orderDirection,
    statusFilter,
    handleStatusChange,
    handleBulkStatusUpdate,
    toggleSelectAll,
    handleToggleSelectOrder,
    handleSearchChange,
    handleStatusFilterChange,
    handleSortChange,
    clearSelection,
  } = useOrders();

  // Debounce search input
  useEffect(() => {
    const debouncedSearch = debounce((term: string) => {
      handleSearchChange(term);
    }, 300);
    
    debouncedSearch(localSearchTerm);
    
    return () => {
      // Clean up any pending debounce
    };
  }, [localSearchTerm]);

  // View order details
  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };
  
  // Handle error display
  useEffect(() => {
    if (error) {
      toast.error("Failed to load orders", {
        description: error,
      });
    }
  }, [error]);

  // Render skeletons while loading
  if (loading) {
    return (
      <PageContainer>
        <div className="page-container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
              <p className="text-muted-foreground mt-1">
                Manage and track all your customer orders
              </p>
            </div>
          </div>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-[1fr_auto_auto_auto]">
                {/* Skeleton filters */}
                <div><Skeleton className="h-10 w-full" /></div>
                <div><Skeleton className="h-10 w-[180px]" /></div>
                <div><Skeleton className="h-10 w-20" /></div>
                <div><Skeleton className="h-10 w-36" /></div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <div className="page-container relative">
        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all your customer orders
            </p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0 gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => toast.success("Orders exported successfully")}
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => toast.success("Printing order list")}
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-[1fr_auto_auto_auto]">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders or customers..."
                  className="pl-8"
                  value={localSearchTerm}
                  onChange={(e) => setLocalSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'outline'} 
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="h-9 w-9"
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'outline'} 
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="h-9 w-9"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
              
              <div>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Advanced Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Orders Table/Grid */}
        <Card className="hover-scale card-transition">
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <CardTitle className="flex items-center gap-2">
              <span>All Orders</span>
              <span className="text-sm font-normal text-muted-foreground">
                ({orders.length} orders found)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {viewMode === 'list' ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={
                            orders.length > 0 && 
                            selectedOrderIds.length === orders.length
                          }
                          onCheckedChange={toggleSelectAll}
                          aria-label="Select all orders"
                        />
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSortChange('id')}>
                        <div className="flex items-center gap-1">
                          Order ID
                          {orderBy === 'id' && (
                            orderDirection === 'asc' 
                              ? <ArrowUpWideNarrow className="h-3 w-3" /> 
                              : <ArrowDownWideNarrow className="h-3 w-3" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSortChange('customer')}>
                        <div className="flex items-center gap-1">
                          Customer
                          {orderBy === 'customer' && (
                            orderDirection === 'asc' 
                              ? <ArrowUpWideNarrow className="h-3 w-3" /> 
                              : <ArrowDownWideNarrow className="h-3 w-3" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSortChange('date')}>
                        <div className="flex items-center gap-1">
                          Date
                          {orderBy === 'date' && (
                            orderDirection === 'asc' 
                              ? <ArrowUpWideNarrow className="h-3 w-3" /> 
                              : <ArrowDownWideNarrow className="h-3 w-3" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSortChange('amount')}>
                        <div className="flex items-center gap-1">
                          Amount
                          {orderBy === 'amount' && (
                            orderDirection === 'asc' 
                              ? <ArrowUpWideNarrow className="h-3 w-3" /> 
                              : <ArrowDownWideNarrow className="h-3 w-3" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSortChange('status')}>
                        <div className="flex items-center gap-1">
                          Status
                          {orderBy === 'status' && (
                            orderDirection === 'asc' 
                              ? <ArrowUpWideNarrow className="h-3 w-3" /> 
                              : <ArrowDownWideNarrow className="h-3 w-3" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id} className="animate-fade-in">
                        <TableCell>
                          <Checkbox
                            checked={selectedOrderIds.includes(order.id)}
                            onCheckedChange={() => handleToggleSelectOrder(order.id)}
                            aria-label={`Select order ${order.id}`}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{formatDate(order.date)}</TableCell>
                        <TableCell>{formatCurrency(order.amount)}</TableCell>
                        <TableCell>
                          <span className={cn(
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                            statusStyles[order.status as keyof typeof statusStyles]
                          )}>
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                Actions <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                className="flex items-center gap-2"
                                onClick={() => viewOrderDetails(order)}
                              >
                                <Eye className="h-4 w-4" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Printer className="h-4 w-4" /> Print Order
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Download className="h-4 w-4" /> Download Invoice
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders.map((order) => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardHeader className="p-4 flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle className="text-base mb-1">{order.id}</CardTitle>
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                          statusStyles[order.status as keyof typeof statusStyles]
                        )}>
                          {order.status}
                        </span>
                      </div>
                      <Checkbox
                        checked={selectedOrderIds.includes(order.id)}
                        onCheckedChange={() => handleToggleSelectOrder(order.id)}
                        aria-label={`Select order ${order.id}`}
                      />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Customer:</span>
                          <span className="font-medium">{order.customer}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Date:</span>
                          <span>{formatDate(order.date)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="font-medium">{formatCurrency(order.amount)}</span>
                        </div>
                        <div className="pt-3 flex justify-end">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => viewOrderDetails(order)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Details Dialog */}
        <OrderDetails 
          open={isDetailsOpen} 
          onOpenChange={setIsDetailsOpen}
          order={selectedOrder}
          onStatusChange={handleStatusChange}
        />

        {/* Bulk Actions Bar */}
        <BulkActions 
          selectedOrders={selectedOrderIds}
          onClearSelection={clearSelection}
          onUpdateStatus={handleBulkStatusUpdate}
        />
      </div>
    </PageContainer>
  );
};

export default Orders;
