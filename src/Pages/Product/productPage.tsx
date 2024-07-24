import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, postReview } from "../../redux/slices/productSlice";
import axios from 'axios';
import {  AppDispatch } from '../../redux/store';
import './productPage.css';
import { createSingleItemOrder } from '../../redux/slices/singleItemOrderSlice';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { AnyAction } from "redux";
import productImage from './MQTQ3.png';
import profileImage from './profile_image.png';
import { useParams, useNavigate , Link} from "react-router-dom";
import Toast from '../../components/Toast/Toast';
import Spinner from '../../components/Spinner/Spinner';
import { BACKEND_URL } from '../../constants/api';
import Product from '../../components/AvailableProduct/product';
import NavBar from '../../components/NavBar'
import './SingleProductPage.scss';

const SingleProductPage = () => {
    const { productId } = useParams();
    // Use useDispatch with AppDispatch type for correct typing
    const product = useSelector((state: RootState) => state.productReviews.product);
    const reviews = useSelector((state: RootState) => state.productReviews.reviews);
    const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [reviewText, setReviewText] = useState('');
    const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
    const { isLoading, error, checkoutObject } = useSelector((state: RootState) => state.singleItemOrder);
    const navigate = useNavigate()
    useEffect(() => {
        if (productId) {
            dispatch(fetchProduct(productId));
        }


    }, [productId]);



    const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setReviewText(e.target.value);
    };


    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleBuySingleProduct = async () => {
      try {
        await dispatch(createSingleItemOrder({ productId: productId || '', quantity }));
      } catch (error) {
        console.error('Error during checkout:', error);
      }
    };

    const handlePopupSubmit = () => {
      setIsPopupOpen(false);
      handleBuySingleProduct();
    };
    const fetchRecommendedProducts = async () => {
      try {
        const response = await axios.post(`${BACKEND_URL}/api/products/recommend`, {
            "productId": productId
        });
        setRecommendedProducts(response.data.products);
      } catch (err) {
        console.log(err)
        // setError('Failed to fetch recommended products');
      }
    };

    useEffect(() => {
fetchRecommendedProducts()
    }, [productId])
    useEffect(() => {
      if (checkoutObject) {
        navigate(`/product/${productId}/checkout`);
      }
    }, [checkoutObject, navigate, productId]);

    return (
      <>
      <NavBar />
        <div className="single-product-container">
            <button className="back-btn"><Link to={'/'} className='navLink'>&#8592; Back</Link> </button>
            {
                product &&
                <div className="product-section">
                <div className="singleProduct-image">
                    <img src={product.data.images?.[0] || productImage} alt="Product Image"/>
                    <button className="checkout-btn" onClick={() => setIsPopupOpen(true)}>Proceed to checkout</button>
                </div>
                <div className="product-details">
                    <h1>Product Name: {product.data.name}</h1>
                    <div className="divider"></div>
                    <p>Price: {product.data.price} RWF</p>
                    <p>Category: {product.data.category}</p>
                    <p>Expiration Date: {product.data.expiryDate ? new Date(product.expiryDate).toLocaleDateString() : 'N/A'}</p>
                    <p>Discount: {product.data.discount || 'No discount'}</p>
                    <p>Description: {product.data.description || 'No description available'}</p>
                    <p>Quantity: <input type="number" min="1" value={product.data.quantity || 1} readOnly/></p>
                </div>
            </div>
            }

            <div className="reviews-section">
                <div className="reviews-left">
                    <h2>Rating & Reviews</h2>
                    <p>Product Reviews</p>
                    <p>Feedback: <span className="stars">★★★★☆</span> 4.3 out of 5</p>
                </div>
                <div className="reviews-right">
                    <h3>Write a review</h3>
                    <textarea placeholder="Type your review here"></textarea>
                    <button className="submit-btn">Submit</button>
                </div>
            </div>
            <div className="reviews-list">
                <div className="review-item">
                    <img src={profileImage} alt="User Image"/>
                    <div className="review-content">
                        <p><strong>Client Name</strong></p>
                        <p>Review text goes here...</p>
                        <p>★★★★☆</p>
                    </div>
                </div>
                <div className="review-item">
                    <img src={profileImage} alt="User Image"/>
                    <div className="review-content">
                        <p><strong>Client Name</strong></p>
                        <p>Review text goes here...</p>
                        <p>★★★★☆</p>
                    </div>
                </div>
                <div className="review-item">
                    <img src={profileImage} alt="User Image"/>
                    <div className="review-content">
                        <p><strong>Client Name</strong></p>
                        <p>Review text goes here...</p>
                        <p>★★★★☆</p>
                    </div>
                </div>
            </div>

            {
              recommendedProducts &&
              <div className="product-container">
  <h3>You might also like this</h3>
  <div className="product-list">
    {recommendedProducts.map((recommendedProduct) => (
      <Product
        key={recommendedProduct.productId}
        productId={recommendedProduct.productId}
        name={recommendedProduct.name}
        category={recommendedProduct.category}
        price={recommendedProduct.price}
        images={recommendedProduct.images}
        discount={recommendedProduct.discount}
      />
    ))}
  </div>
</div>
            }

            {isPopupOpen && (
        <div className='popup-modal'>
          <div className='popup-content-modal'>
            <h3>Enter Quantity</h3>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
            />
            <button onClick={handlePopupSubmit}>Submit</button>
            <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
      {error && <Toast messageType="error" message={error} />}
      {isLoading && <Spinner />}
        </div>
        </>
    );
};

export default SingleProductPage;


