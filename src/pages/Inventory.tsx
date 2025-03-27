
import React, { useState } from 'react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { products } from '@/utils/mockData';
import { cn } from '@/lib/utils';
import { Filter, PackagePlus, PlusCircle, Search } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Stock status styles
const statusStyles = {
  "In Stock": "bg-green-100 text-green-800 border-green-200",
  "Low Stock": "bg-orange-100 text-orange-800 border-orange-200",
  "Out of Stock": "bg-red-100 text-red-800 border-red-200",
};

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Get stock level color
  const getStockLevelColor = (level: number) => {
    if (level === 0) return "bg-red-500";
    if (level <= 10) return "bg-orange-500";
    return "bg-green-500";
  };
  
  // Calculate stock percentage for progress bar
  const calculateStockPercentage = (level: number) => {
    const maxStock = 150; // Assume max stock is 150 for the progress bar
    return Math.min(Math.round((level / maxStock) * 100), 100);
  };
  
  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === '' || 
      product.category === categoryFilter;
    
    const matchesStatus = 
      statusFilter === '' || 
      product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Get unique categories for filter
  const categories = [...new Set(products.map(product => product.category))];
  
  return (
    <PageContainer>
      <div className="page-container">
        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
            <p className="text-muted-foreground mt-1">
              Manage your product inventory and stock levels
            </p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0 gap-2">
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>
        
        {/* Inventory Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="hover-scale card-transition">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Total Products</span>
                <span className="text-2xl font-bold mt-1">{products.length}</span>
                <span className="text-xs text-muted-foreground mt-1">Across {categories.length} categories</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-scale card-transition">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">In Stock</span>
                <span className="text-2xl font-bold mt-1">{products.filter(p => p.status === "In Stock").length}</span>
                <span className="text-xs text-green-600 mt-1">Healthy inventory levels</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-scale card-transition">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Low Stock</span>
                <span className="text-2xl font-bold mt-1">{products.filter(p => p.status === "Low Stock").length}</span>
                <span className="text-xs text-orange-600 mt-1">Need attention soon</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-scale card-transition">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Out of Stock</span>
                <span className="text-2xl font-bold mt-1">{products.filter(p => p.status === "Out of Stock").length}</span>
                <span className="text-xs text-red-600 mt-1">Restock required</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="In Stock">In Stock</SelectItem>
                    <SelectItem value="Low Stock">Low Stock</SelectItem>
                    <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Products Table */}
        <Card className="hover-scale card-transition">
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <CardTitle>All Products</CardTitle>
            <div className="text-sm text-muted-foreground">
              {filteredProducts.length} products found
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className="animate-fade-in">
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{formatCurrency(product.price)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={calculateStockPercentage(product.stockLevel)} 
                          className={cn("h-2 w-24", getStockLevelColor(product.stockLevel))}
                        />
                        <span>{product.stockLevel}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                        statusStyles[product.status as keyof typeof statusStyles]
                      )}>
                        {product.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Inventory;
