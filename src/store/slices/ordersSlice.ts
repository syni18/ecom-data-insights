
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orders } from '@/utils/mockData';

// Define the Order type
export interface Order {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: string;
  email?: string; // Making email optional
  items?: {
    productId: number;
    name: string;
    quantity: number;
    price: number;
  }[];
}

// Define the state type
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

// Fetch orders async thunk
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  // Simulate API call with timeout
  return new Promise<Order[]>((resolve) => {
    setTimeout(() => {
      resolve(orders);
    }, 1000);
  });
});

// Initial state
const initialState: OrdersState = {
  orders: {},
  loading: false,
  error: null,
  selectedOrderIds: [],
  searchTerm: '',
  statusFilter: 'all',
  orderBy: 'date',
  orderDirection: 'desc',
};

// Create the slice
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    updateOrderStatus: (state, action: PayloadAction<{ orderId: string; newStatus: string }>) => {
      const { orderId, newStatus } = action.payload;
      if (state.orders[orderId]) {
        state.orders[orderId].status = newStatus;
      }
    },
    setSelectedOrderIds: (state, action: PayloadAction<string[]>) => {
      state.selectedOrderIds = action.payload;
    },
    toggleSelectOrder: (state, action: PayloadAction<string>) => {
      const orderId = action.payload;
      if (state.selectedOrderIds.includes(orderId)) {
        state.selectedOrderIds = state.selectedOrderIds.filter((id) => id !== orderId);
      } else {
        state.selectedOrderIds.push(orderId);
      }
    },
    clearSelectedOrders: (state) => {
      state.selectedOrderIds = [];
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload.reduce((acc: Record<string, Order>, order) => {
          acc[order.id] = order;
          return acc;
        }, {});
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      });
  },
});

// Export actions and reducer
export const {
  updateOrderStatus,
  setSelectedOrderIds,
  toggleSelectOrder,
  setSearchTerm,
  setStatusFilter,
  setOrderBy,
  setOrderDirection,
  clearSelectedOrders,
} = ordersSlice.actions;

export default ordersSlice.reducer;
