
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orders as mockOrders } from '@/utils/mockData';

// Define a type for the order items
interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

// Define a type for the order state
export interface Order {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: string;
  items: OrderItem[];
  email?: string;
}

// Define the state shape
interface OrdersState {
  orders: Record<string, Order>;
  loading: boolean;
  error: string | null;
  selectedOrderIds: string[];
  searchTerm: string;
  statusFilter: string;
  orderBy: string;
  orderDirection: 'asc' | 'desc';
}

// Prepare orders with additional data like email
const ordersWithItems = mockOrders.map(order => ({
  ...order,
  email: order.email || `customer${Math.floor(Math.random() * 1000)}@example.com`
}));

// Create an async thunk for fetching orders
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return ordersWithItems;
    } catch (error) {
      return rejectWithValue('Failed to fetch orders.');
    }
  }
);

// Create an async thunk for updating an order's status
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, newStatus }: { orderId: string; newStatus: string }, { rejectWithValue }) => {
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return { orderId, newStatus };
    } catch (error) {
      return rejectWithValue('Failed to update order status.');
    }
  }
);

// Normalize the orders for the initial state
const normalizedOrders = ordersWithItems.reduce((acc, order) => {
  acc[order.id] = order;
  return acc;
}, {} as Record<string, Order>);

// Create the slice
const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: normalizedOrders,
    loading: false,
    error: null,
    selectedOrderIds: [],
    searchTerm: '',
    statusFilter: 'all',
    orderBy: 'date',
    orderDirection: 'desc' as const,
  } as OrdersState,
  reducers: {
    setSelectedOrderIds: (state, action: PayloadAction<string[]>) => {
      state.selectedOrderIds = action.payload;
    },
    toggleSelectOrder: (state, action: PayloadAction<string>) => {
      const orderId = action.payload;
      const index = state.selectedOrderIds.indexOf(orderId);
      if (index === -1) {
        state.selectedOrderIds.push(orderId);
      } else {
        state.selectedOrderIds.splice(index, 1);
      }
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
    },
    setOrderBy: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload;
    },
    setOrderDirection: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.orderDirection = action.payload;
    },
    clearSelectedOrders: (state) => {
      state.selectedOrderIds = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        // Normalize the orders
        const normalizedOrders = action.payload.reduce((acc, order) => {
          acc[order.id] = order;
          return acc;
        }, {} as Record<string, Order>);
        state.orders = normalizedOrders;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { orderId, newStatus } = action.payload;
        if (state.orders[orderId]) {
          state.orders[orderId].status = newStatus;
        }
      });
  },
});

export const {
  setSelectedOrderIds,
  toggleSelectOrder,
  setSearchTerm,
  setStatusFilter,
  setOrderBy,
  setOrderDirection,
  clearSelectedOrders,
} = ordersSlice.actions;

export default ordersSlice.reducer;
