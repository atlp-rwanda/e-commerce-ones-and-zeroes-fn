import axios from 'axios';

const BASE_URL =  process.env.REACT_APP_BACKEND_URL ;

export const addToWishlist = async (productId: string, token: string) => {
  return await axios.post(
    `${BASE_URL}/api/wishlist/${productId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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
