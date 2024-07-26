import React, { useState, useEffect } from 'react';
import { getWishlist, deleteFromWishlist, clearWishlist } from '../services/wishlistService';
import Header from '../Header';
import Toast from '../Toast/Toast'; 
import "./wishlist.scss"
import FloatingButton from '../chatButton/button';

const WishlistPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [wishlist, setWishlist] = useState<any[]>([]);
  const token = localStorage.getItem('token');

  const fetchWishlist = async () => {
    if (!token) {
      setMessage('Token not found');
      setMessageType('error');
      return;
    }
    try {
      const response = await getWishlist(token);
      setWishlist(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setMessage('Failed to fetch wishlist');
      setMessageType('error');
    }
  };

  const handleDeleteFromWishlist = async (productId: string) => {
    if (!token) {
      setMessage('Token not found');
      setMessageType('error');
      return;
    }
    try {
      const response = await deleteFromWishlist(productId, token);
      setMessage(response.data.message);
      setMessageType('success');
      fetchWishlist(); // Refresh wishlist
    } catch (error) {
      setMessage('Failed to remove product from wishlist');
      setMessageType('error');
    }
  };

  const handleClearWishlist = async () => {
    if (!token) {
      setMessage('Token not found');
      setMessageType('error');
      return;
    }
    try {
      const response = await clearWishlist(token);
      setMessage(response.data.message);
      setMessageType('success');
      fetchWishlist(); // Refresh wishlist
    } catch (error) {
      setMessage('Failed to clear wishlist');
      setMessageType('error');
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div>
      <Header />
      <div className='wishlist'>
        <h2>My Wishlist</h2>
        <button onClick={handleClearWishlist} className='clear-wishlist'>
          Clear Wishlist
        </button>
        <ul>
          {wishlist.map((item: any) => (
            <li key={item.id}>
              <img src={item.product.images[0]} alt={item.product.name} />
              {item.product.name} - ${item.product.price}
              <button onClick={() => handleDeleteFromWishlist(item.productId)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <Toast message={message} messageType={messageType} />
      </div>
      <FloatingButton/>
    </div>
  );
};

export default WishlistPage;
