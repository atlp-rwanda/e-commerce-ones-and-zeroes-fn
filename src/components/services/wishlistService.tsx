import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL =  process.env.REACT_APP_BACKEND_URL ;

export const addToWishlist = async (productId: string, token: string) => {
  try {
    // Perform the POST request
    await axios.post(
      `${BASE_URL}/api/wishlist/${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Show success message after successful request
    toast.success("Product added to wishlist successfully");
    
  } catch (error) {
    // Handle errors and show error message if the request fails
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "An error occurred";
      toast.error(message);
    } else {
      toast.error("An unexpected error occurred");
    }
  }
};

export const getWishlist = async (token: string) => {
  return await axios.get(`${BASE_URL}/api/wishlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteFromWishlist = async (productId: string, token: string) => {
  return await axios.delete(`${BASE_URL}/api/wishlist/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const clearWishlist = async (token: string) => {
  return await axios.delete(`${BASE_URL}/api/wishlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
