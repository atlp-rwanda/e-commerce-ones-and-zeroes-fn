import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import "./cart.scss";
import { AppDispatch, RootState } from "../../redux/store";
import {
  deleteProductInCart,
  fetchProductsInCart,
  updateProductQuantityInCart,
  clearCart,
  fetchTotalInCart,
} from "../../redux/slices/cartSlice";
import { checkoutCart } from '../../redux/slices/cartCheckoutSlice';
import { Oval } from "react-loader-spinner";
import Toast from "../Toast/Toast";
import Spinner from "../Spinner/Spinner";
import defaultImage from "../../assets/images/default2.png";

const Cart: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const navigate = useNavigate();
  const { products = [], loading } = useSelector((state: RootState) => state.cart);
  const { total } = useSelector((state: RootState) => state.cart);
  const { isLoading, error, checkoutObject } = useSelector((state: RootState) => state.cartCheckout);

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    dispatch(fetchProductsInCart());
    dispatch(fetchTotalInCart());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const initialQuantities: { [key: string]: number } = {};
      products.forEach((product) => {
        initialQuantities[product.productId] = product.CartProduct.quantity;
      });
      setQuantities(initialQuantities);
    }
  }, [products]);

  useEffect(() => {
    if (checkoutObject) {
      navigate("/checkout");
    }
  }, [checkoutObject, navigate]);

  const handleQuantityChange = (productId: string, value: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: value,
    }));
  };

  const handleUpdateQuantity = async (
    e: React.FormEvent,
    productId: string,
    quantity: number
  ) => {
    e.preventDefault();
    try {
      await dispatch(updateProductQuantityInCart({ productId, quantity }));
      await dispatch(fetchProductsInCart());
      await dispatch(fetchTotalInCart());
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleRemoveProduct = async (e: React.FormEvent, productId: string) => {
    e.preventDefault();
    try {
      await dispatch(deleteProductInCart({ productId }));
      await dispatch(fetchProductsInCart());
      await dispatch(fetchTotalInCart());
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleClearCart = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(clearCart());
      dispatch(fetchProductsInCart());
      dispatch(fetchTotalInCart());
    } catch (error) {
      console.error("Failed to clear the cart:", error);
    }
  };

  const handleCartCheckout = async () => {
    try {
      await dispatch(checkoutCart());
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="cart-body">
      {loading ? (
        <div className="spinerloader">
          <Oval height={40} width={40} color="red" visible={true} ariaLabel="oval-loading" secondaryColor="darkblue" strokeWidth={2} />
          <p>Loading....</p>
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className="empty-cart">
              <h1>Your Cart is Empty</h1>
              <h4>Continue shopping to add items.</h4>
            </div>
          ) : (
            <>
              <div className="cart-header">
                <div className="cart-header-contents">
                  <div className="clear-cart">
                    <h1>Shopping Cart</h1>
                    <span onClick={(e) => handleClearCart(e)}>
                      <p>Clear Cart</p>
                    </span>
                  </div>
                  <h5>Price (Rwf)</h5>
                </div>
                <hr />
              </div>
              <div className="cart-data">
                {products.map((product) => (
                  <div className="retrieved-data" key={product.productId}>
                    <div className="cart-retrieved-data">
                      <div className="product-img">
                        <img
                          src={product.images && product.images.length > 0 ? product.images[0] : defaultImage}
                          alt={product.name}
                        />
                      </div>
                      <div className="product-data">
                        <h2>{product.name}</h2>
                        <p>{product.description || "No description available."}</p>
                        <p className="left-quantity">
                          Only {product.quantity} left in stock - order soon
                        </p>
                        <div className="product-actions">
                          <form
                            onSubmit={(e) => handleUpdateQuantity(e, product.productId, quantities[product.productId])}
                          >
                            <div className="qty-input">
                              Qty:
                              <input
                                type="number"
                                name="quantity"
                                value={quantities[product.productId]}
                                onChange={(e) => handleQuantityChange(product.productId, Number(e.target.value))}
                              />
                            </div>
                            <button type="submit">Update</button>
                          </form>
                          <hr />
                          <p onClick={(e) => handleRemoveProduct(e, product.productId)}>Delete</p>
                        </div>
                      </div>
                      <div className="product-price">
                        <span>Price:</span>
                        {product.price} Rwf
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
              <div className="cart-footer">
                <div className="cart-total">
                  <h2>Subtotal ({products.length} items): {total} Rwf</h2>
                </div>
                <button onClick={handleCartCheckout} disabled={loading}>
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </>
      )}
      {error && <Toast messageType="error" message={error} />}
      {isLoading && <Spinner />}
    </div>
  );
};

export default Cart;
