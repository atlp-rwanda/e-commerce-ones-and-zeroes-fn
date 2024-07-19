import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { createSingleItemOrder } from '../../redux/slices/singleItemOrderSlice';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { AnyAction } from "redux";
import Toast from '../../components/Toast/Toast';
import './SingleProductPage.scss'

const SingleProductPage = () => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const { isLoading, error, checkoutObject } = useSelector((state: RootState) => state.singleItemOrder);
  const navigate = useNavigate();
  const { productId } = useParams();

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

  useEffect(() => {
    if (checkoutObject) {
      navigate(`/product/${productId}/checkout`);
    }
  }, [checkoutObject, navigate, productId]);

  return (
    <div>
      <button onClick={() => setIsPopupOpen(true)}>Buy it</button>
      {isPopupOpen && (
        <div className='popup'>
          <div className='popup-content'>
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
    </div>
  );
};

export default SingleProductPage;
