import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, postReview } from "../../redux/slices/productSlice";
import { RootState, AppDispatch } from '../../redux/store';
import './productPage.css';
import dispatch from 'redux'
import productImage from './MQTQ3.png';
import profileImage from './profile_image.png';
import { useParams } from "react-router-dom";

const SingleProductPage = () => {
    const { productId } = useParams();
    // Use useDispatch with AppDispatch type for correct typing
    const dispatch = useDispatch<AppDispatch>();
    const product = useSelector((state: RootState) => state.productReviews.product);
    const reviews = useSelector((state: RootState) => state.productReviews.reviews);
    const [reviewText, setReviewText] = useState('');

    useEffect(() => {
        if (productId) {
            dispatch(fetchProduct(productId));
        }
    }, [dispatch, productId]);

    useEffect(() => {
        if (product) {
            console.log('Product data:', product); // Log the product data to the console
        }
    }, [product]); // This useEffect will run when the product data changes


    const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setReviewText(e.target.value);
    };

    return (
        <div className="single-product-container">
            <button className="back-btn">&#8592; Back</button>
            <div className="product-section">
                <div className="product-image">
                    <img src={product.images?.[0] || productImage} alt="Product Image"/>
                    <button className="checkout-btn">Proceed to checkout</button>
                </div>
                <div className="product-details">
                    <h1>Product Name: {product.name}</h1>
                    <div className="divider"></div>
                    <p>Price: {product.price} RWF</p>
                    <p>Category: {product.category}</p>
                    <p>Expiration Date: {product.expiryDate ? new Date(product.expiryDate).toLocaleDateString() : 'N/A'}</p>
                    <p>Discount: {product.discount || 'No discount'}</p>
                    <p>Description: {product.description || 'No description available'}</p>
                    <p>Quantity: <input type="number" min="1" value={product.quantity || 1} readOnly/></p>
                    <p>Availability: <input type="checkbox" checked={product.isAvailable} disabled/></p>
                </div>
            </div>
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
        </div>
    );
};

export default SingleProductPage;


