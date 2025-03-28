
// Products data
// export const products = [
//   { 
//     id: 1, 
//     name: "Premium Wireless Headphones", 
//     category: "Electronics", 
//     price: 299.99, 
//     stockLevel: 142, 
//     status: "In Stock"
//   },
//   { 
//     id: 2, 
//     name: "Ultra HD Smart TV 55\"", 
//     category: "Electronics", 
//     price: 899.99, 
//     stockLevel: 28, 
//     status: "In Stock"
//   },
//   { 
//     id: 3, 
//     name: "Designer Watch - Limited Edition", 
//     category: "Accessories", 
//     price: 459.99, 
//     stockLevel: 13, 
//     status: "Low Stock"
//   },
//   { 
//     id: 4, 
//     name: "Professional Blender", 
//     category: "Home & Kitchen", 
//     price: 179.99, 
//     stockLevel: 56, 
//     status: "In Stock"
//   },
//   { 
//     id: 5, 
//     name: "Ergonomic Office Chair", 
//     category: "Furniture", 
//     price: 249.99, 
//     stockLevel: 37, 
//     status: "In Stock"
//   },
//   { 
//     id: 6, 
//     name: "Luxury Fountain Pen", 
//     category: "Office Supplies", 
//     price: 89.99, 
//     stockLevel: 8, 
//     status: "Low Stock"
//   },
//   { 
//     id: 7, 
//     name: "Smartphone - Latest Model", 
//     category: "Electronics", 
//     price: 999.99, 
//     stockLevel: 92, 
//     status: "In Stock"
//   },
//   { 
//     id: 8, 
//     name: "Wireless Charging Pad", 
//     category: "Electronics", 
//     price: 49.99, 
//     stockLevel: 5, 
//     status: "Low Stock"
//   },
//   { 
//     id: 9, 
//     name: "Fitness Tracker", 
//     category: "Wearables", 
//     price: 129.99, 
//     stockLevel: 67, 
//     status: "In Stock"
//   },
//   { 
//     id: 10, 
//     name: "Premium Coffee Maker", 
//     category: "Home & Kitchen", 
//     price: 199.99, 
//     stockLevel: 0, 
//     status: "Out of Stock"
//   },
// ];

// Orders data
export const orders = [
  {
    id: "ORD-7352",
    customer: "Emma Thompson",
    date: "2023-10-05",
    amount: 899.99,
    status: "Delivered",
    items: [
      { productId: 2, name: "Ultra HD Smart TV 55\"", quantity: 1, price: 899.99 }
    ]
  },
  {
    id: "ORD-7351",
    customer: "Michael Chen",
    date: "2023-10-04",
    amount: 329.98,
    status: "Processing",
    items: [
      { productId: 1, name: "Premium Wireless Headphones", quantity: 1, price: 299.99 },
      { productId: 8, name: "Wireless Charging Pad", quantity: 1, price: 49.99 }
    ]
  },
  {
    id: "ORD-7350",
    customer: "Sofia Rodriguez",
    date: "2023-10-04",
    amount: 179.99,
    status: "Shipped",
    items: [
      { productId: 4, name: "Professional Blender", quantity: 1, price: 179.99 }
    ]
  },
  {
    id: "ORD-7349",
    customer: "James Wilson",
    date: "2023-10-03",
    amount: 999.99,
    status: "Processing",
    items: [
      { productId: 7, name: "Smartphone - Latest Model", quantity: 1, price: 999.99 }
    ]
  },
  {
    id: "ORD-7348",
    customer: "Olivia Kim",
    date: "2023-10-03",
    amount: 549.98,
    status: "Delivered",
    items: [
      { productId: 3, name: "Designer Watch - Limited Edition", quantity: 1, price: 459.99 },
      { productId: 6, name: "Luxury Fountain Pen", quantity: 1, price: 89.99 }
    ]
  },
  {
    id: "ORD-7347",
    customer: "Noah Martinez",
    date: "2023-10-02",
    amount: 379.98,
    status: "Shipped",
    items: [
      { productId: 4, name: "Professional Blender", quantity: 1, price: 179.99 },
      { productId: 9, name: "Fitness Tracker", quantity: 1, price: 129.99 },
      { productId: 8, name: "Wireless Charging Pad", quantity: 1, price: 49.99 }
    ]
  },
  {
    id: "ORD-7346",
    customer: "Ava Johnson",
    date: "2023-10-01",
    amount: 249.99,
    status: "Delivered",
    items: [
      { productId: 5, name: "Ergonomic Office Chair", quantity: 1, price: 249.99 }
    ]
  },
  {
    id: "ORD-7345",
    customer: "Ethan Brown",
    date: "2023-09-30",
    amount: 299.99,
    status: "Delivered",
    items: [
      { productId: 1, name: "Premium Wireless Headphones", quantity: 1, price: 299.99 }
    ]
  },
  {
    id: "ORD-7344",
    customer: "Isabella Garcia",
    date: "2023-09-29",
    amount: 179.99,
    status: "Cancelled",
    items: [
      { productId: 4, name: "Professional Blender", quantity: 1, price: 179.99 }
    ]
  },
  {
    id: "ORD-7343",
    customer: "William Taylor",
    date: "2023-09-28",
    amount: 1799.98,
    status: "Delivered",
    items: [
      { productId: 2, name: "Ultra HD Smart TV 55\"", quantity: 2, price: 1799.98 }
    ]
  }
];

// Sales data for charts
export const salesData = [
  { month: "Jan", sales: 28000 },
  { month: "Feb", sales: 25000 },
  { month: "Mar", sales: 32000 },
  { month: "Apr", sales: 37000 },
  { month: "May", sales: 42000 },
  { month: "Jun", sales: 47000 },
  { month: "Jul", sales: 50000 },
  { month: "Aug", sales: 55000 },
  { month: "Sep", sales: 48000 },
  { month: "Oct", sales: 57000 },
  { month: "Nov", sales: 62000 },
  { month: "Dec", sales: 78000 }
];

// Category sales data
export const categorySalesData = [
  { name: "Electronics", value: 45 },
  { name: "Home & Kitchen", value: 20 },
  { name: "Accessories", value: 15 },
  { name: "Furniture", value: 10 },
  { name: "Wearables", value: 7 },
  { name: "Office Supplies", value: 3 }
];

// Dashboard metrics
export const dashboardMetrics = {
  totalSales: "$156,245",
  totalOrders: 835,
  averageOrder: "$187.12",
  conversionRate: "3.8%",
  totalCustomers: 1243,
  newCustomers: 127,
  returnRate: "2.1%",
  totalProducts: 98,
  lowStockItems: 12,
  outOfStockItems: 3
};

// Top selling products
export const topSellingProducts = [
  { id: 7, name: "Smartphone - Latest Model", sales: 142, category: "Electronics" },
  { id: 1, name: "Premium Wireless Headphones", sales: 121, category: "Electronics" },
  { id: 2, name: "Ultra HD Smart TV 55\"", sales: 87, category: "Electronics" },
  { id: 9, name: "Fitness Tracker", sales: 76, category: "Wearables" },
  { id: 4, name: "Professional Blender", sales: 53, category: "Home & Kitchen" }
];

// Weekly sales data
export const weeklySalesData = [
  { day: "Mon", orders: 32, revenue: 5912 },
  { day: "Tue", orders: 28, revenue: 4892 },
  { day: "Wed", orders: 37, revenue: 6723 },
  { day: "Thu", orders: 42, revenue: 7543 },
  { day: "Fri", orders: 48, revenue: 8965 },
  { day: "Sat", orders: 57, revenue: 10342 },
  { day: "Sun", orders: 51, revenue: 9254 }
];

// Customer data
export const customerData = {
  demographics: {
    age: [
      { group: "18-24", percentage: 15 },
      { group: "25-34", percentage: 32 },
      { group: "35-44", percentage: 27 },
      { group: "45-54", percentage: 16 },
      { group: "55+", percentage: 10 }
    ],
    gender: [
      { group: "Male", percentage: 48 },
      { group: "Female", percentage: 51 },
      { group: "Other", percentage: 1 }
    ],
    location: [
      { region: "North America", percentage: 62 },
      { region: "Europe", percentage: 23 },
      { region: "Asia", percentage: 10 },
      { region: "Other", percentage: 5 }
    ]
  },
  behavior: {
    acquisitionChannels: [
      { channel: "Organic Search", percentage: 35 },
      { channel: "Direct", percentage: 25 },
      { channel: "Social Media", percentage: 20 },
      { channel: "Referral", percentage: 12 },
      { channel: "Email", percentage: 8 }
    ],
    purchaseFrequency: [
      { frequency: "One-time", percentage: 45 },
      { frequency: "Occasional", percentage: 32 },
      { frequency: "Regular", percentage: 18 },
      { frequency: "Frequent", percentage: 5 }
    ]
  }
};
