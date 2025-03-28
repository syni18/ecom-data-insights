import axios from 'axios';

const API_BASE_URL = 'https://67e642d66530dbd3110f3f9a.mockapi.io';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stockLevel: number;
  status: string;
}

export const productApi = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Products`, {
        headers: {
          'content-type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
};