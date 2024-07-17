import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/images/default2.png';
import { addToWishlist } from '../services/wishlistService';
import Toast from '../Toast/Toast';

interface ProductProps {
  productId: string;
  name: string;
  price: string;
  images: string[];
  discount: string;
  category: string;
}

const Product: React.FC<ProductProps> = ({ productId, name, price, images, discount, category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(images[0] || defaultImage);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleMouseEnter = () => {
    if (images.length > 1) {
      setCurrentImage(images[1]);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setCurrentImage(images[0] || defaultImage);
    setIsHovered(false);
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = defaultImage;
  };

  const handleViewMore = () => {
    navigate(`/product/${productId}`);
  };

  const handleAddToWishlist = async () => {
    if (!token) {
      setMessage('Please Login to continue');
      setMessageType('error');
      return;
    }
    try {
      const response = await addToWishlist(productId, token);
      setMessage(response.data.message);
      setMessageType('success');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to add product to wishlist');
      setMessageType('error');
    }
  };

  return (
    <div className="product-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {discount && (
        <div className="discount-label">{discount}</div>
      )}
      <div>
        <button className="favorite-label" onClick={handleAddToWishlist}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FF6D18">
            <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
          </svg>
        </button>
      </div>
      <img src={currentImage} alt={name} className="product-image" onError={handleImageError} />
      <div className="description">
        <h2>{name}</h2>
        <p>{price} $</p>
        <p>
          <span className="bonus">Category: </span>
          {category}
        </p>
      </div>
      <div className="button-container">
        <button className="btn view-more" onClick={handleViewMore}>View More</button>
        <button className="btn add-to-cart">Add to cart</button>
      </div>
      <Toast message={message} messageType={messageType} />
    </div>
  );
};

export default Product;
