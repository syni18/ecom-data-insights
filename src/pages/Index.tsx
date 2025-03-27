
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import OverviewCard from '@/components/dashboard/OverviewCard';
import SalesChart from '@/components/dashboard/SalesChart';
import RecentOrders from '@/components/dashboard/RecentOrders';
import { 
  dashboardMetrics, 
  orders, 
  weeklySalesData,
  topSellingProducts
} from '@/utils/mockData';
import { 
  BarChart2, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Users,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const Index = () => {
  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a668ff', '#41d9bd'];
  
  // Format for the weekly date scale
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <PageContainer>
      <div className="page-container">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's what's happening with your store today.
            </p>
          </div>
        </div>
        
        {/* Metrics Overview */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <OverviewCard 
            title="Total Sales" 
            value={dashboardMetrics.totalSales} 
            icon={DollarSign}
            trend={{ value: "12.5%", positive: true }}
            description="vs last month" 
          />
          <OverviewCard 
            title="Total Orders" 
            value={dashboardMetrics.totalOrders} 
            icon={ShoppingCart}
            trend={{ value: "8.2%", positive: true }}
            description="vs last month"
            iconColor="text-blue-600" 
          />
          <OverviewCard 
            title="Total Customers" 
            value={dashboardMetrics.totalCustomers} 
            icon={Users}
            trend={{ value: "5.1%", positive: true }}
            description="vs last month"
            iconColor="text-purple-600" 
          />
          <OverviewCard 
            title="Low Stock Items" 
            value={dashboardMetrics.lowStockItems} 
            icon={AlertTriangle}
            trend={{ value: "2", positive: false }}
            description="more than last week"
            iconColor="text-orange-600" 
          />
        </div>
        
        {/* Charts Row */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <SalesChart />
          
          <Card className="hover-scale card-transition">
            <CardHeader>
              <CardTitle>Weekly Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklySalesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis
                      yAxisId="left"
                      orientation="left"
                      tickFormatter={(value) => `$${value}`}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip
                      formatter={(value, name) => [
                        name === 'revenue' ? formatCurrency(Number(value)) : value,
                        name === 'revenue' ? 'Revenue' : 'Orders'
                      ]}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="revenue"
                      name="Revenue"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="orders"
                      name="Orders"
                      fill="hsl(var(--primary)/0.3)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Bottom Row */}
        <div className="grid gap-6 md:grid-cols-7 mb-8">
          <div className="md:col-span-4">
            <RecentOrders limit={5} />
          </div>
          
          <div className="md:col-span-3">
            <Card className="hover-scale card-transition h-full">
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topSellingProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-muted-foreground">{product.category}</div>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="font-medium">{product.sales} sales</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Index;
