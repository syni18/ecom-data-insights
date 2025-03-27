
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import {
  fetchOrders,
  updateOrderStatus,
  setSelectedOrderIds,
  toggleSelectOrder,
  setSearchTerm,
  setStatusFilter,
  setOrderBy,
  setOrderDirection,
  clearSelectedOrders,
} from '@/store/slices/ordersSlice';

export const useOrders = () => {
  const dispatch = useAppDispatch();
  const {
    orders,
    loading,
    error,
    selectedOrderIds,
    searchTerm,
    statusFilter,
    orderBy,
    orderDirection,
  } = useAppSelector((state) => state.orders);

  // Fetch orders on mount
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Convert orders object to array
  const ordersArray = useMemo(() => Object.values(orders), [orders]);

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    return ordersArray
      .filter((order) => {
        const matchesSearch =
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (orderBy === 'date') {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return orderDirection === 'asc' ? dateA - dateB : dateB - dateA;
        } else if (orderBy === 'amount') {
          return orderDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount;
        } else {
          const valueA = a[orderBy]?.toString().toLowerCase() || '';
          const valueB = b[orderBy]?.toString().toLowerCase() || '';
          return orderDirection === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }
      });
  }, [ordersArray, searchTerm, statusFilter, orderBy, orderDirection]);

  // Handle order status change
  const handleStatusChange = (orderId: string, newStatus: string) => {
    dispatch(updateOrderStatus({ orderId, newStatus }));
  };

  // Handle bulk status update
  const handleBulkStatusUpdate = (orderIds: string[], newStatus: string) => {
    // Update each order's status
    orderIds.forEach((orderId) => {
      dispatch(updateOrderStatus({ orderId, newStatus }));
    });
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectedOrderIds.length === filteredOrders.length) {
      dispatch(clearSelectedOrders());
    } else {
      dispatch(setSelectedOrderIds(filteredOrders.map((order) => order.id)));
    }
  };

  // Toggle select single order
  const handleToggleSelectOrder = (orderId: string) => {
    dispatch(toggleSelectOrder(orderId));
  };

  // Handle search term change
  const handleSearchChange = (term: string) => {
    dispatch(setSearchTerm(term));
  };

  // Handle status filter change
  const handleStatusFilterChange = (status: string) => {
    dispatch(setStatusFilter(status));
  };

  // Handle sort change
  const handleSortChange = (field: string) => {
    if (orderBy === field) {
      dispatch(setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      dispatch(setOrderBy(field));
      dispatch(setOrderDirection('asc'));
    }
  };

  return {
    orders: filteredOrders,
    loading,
    error,
    selectedOrderIds,
    searchTerm,
    statusFilter,
    orderBy,
    orderDirection,
    handleStatusChange,
    handleBulkStatusUpdate,
    toggleSelectAll,
    handleToggleSelectOrder,
    handleSearchChange,
    handleStatusFilterChange,
    handleSortChange,
    clearSelection: () => dispatch(clearSelectedOrders()),
  };
};
