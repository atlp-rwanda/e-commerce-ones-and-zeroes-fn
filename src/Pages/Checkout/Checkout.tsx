import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar";
import { BACKEND_URL } from "../../constants/api";

import { STRIPE_PUBLIC_KEY } from "../../constants/api";
import './Checkout.scss'
import { RootState } from "../../redux/store";
import Spinner from "../../components/Spinner/Spinner";
import Toast from "../../components/Toast/Toast";

function Payment() {
  const stripePromise = loadStripe(STRIPE_PUBLIC_KEY as string);
  const {isLoading, error, checkoutObject } = useSelector((state: RootState) => state.cartCheckout);
  const clientSecret = checkoutObject?.paymentIntent.client_secret;
  const cartProduct = checkoutObject?.cart?.Products;
  const token = localStorage.getItem('token');

  const [userAddress, setUserAddress] = useState({
    country: '',
    province: '',
    district: '',
    sector: '',
    street: ''
  });
  const navigate = useNavigate()

  useEffect(() => {
    if(!clientSecret ) {
      navigate('/')
    }
    const fetchAddressId = async () => {
      try {
        const addressIdResponse = await axios.get(`${BACKEND_URL}/api/addresses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const address = addressIdResponse.data.data;
        setUserAddress(address);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchAddressId();
  }, []);
  

  return (
    <>
   
      <NavBar />
      {clientSecret && stripePromise && Elements &&
      <div>
      <div className="checkout-page-wrapper">
        <h3 className='page-title'>Checkout your cart</h3>
        <div className='checkout-page'>
          <div className="checkout-user-info">
            <div className='shipping-address'>
              <h3 className='checkout-title'>Shipping Address</h3>
              <div className="shipping-address-wrapper">
                {userAddress ? (
                  <p>{userAddress.country}, {userAddress.province}, {userAddress.district}, {userAddress.sector}, {userAddress.street}</p>
                ) : (
                  <p>Loading Address...</p>
                )}
              </div>
            </div>
            <div className='payment-info'>
              <h3 className='checkout-title'>Choose Payment Method</h3>
              <div className="payment-info-wrapper">
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                  </Elements>
              </div>
            </div>
          </div>
          <div className="order-summary">
            <h2 className='checkout-title'>Order summary</h2>
            <div className="cart-item-list">
  {cartProduct?.map((product, index) => (
    <div className={`cart-item ${index % 2 === 0 ? 'even' : 'odd'}`} key={index}>
      <img src={product.images[0]} alt="" />
      <div>
        <div>
          <h4>{product.name}</h4>
        </div>
        <p className="product-order-detail">
          <span>Unit price: <strong>{product.price} RWF </strong></span>
          <span>Quantity: <strong>{product.CartProduct.quantity}</strong></span>
          <span>Sub Total: <strong>{parseInt(product.price) *  product.CartProduct.quantity} RWF</strong></span>
        </p>
      </div>
    </div>
  ))}
</div>

            <div className="order-costs">
              <div className="cost">
                <p>Total cost</p>
                <span>{checkoutObject?.paymentIntent.amount} RWF</span>
              </div>
              <div className="cost">
                <p>Total Discount</p>
                <span>{0} RWF</span>
              </div>
              <div className="cost">
                <p>Final cost</p>
                <span>{checkoutObject?.paymentIntent.amount} RWF</span>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      {isLoading && <Spinner />}
      {error && <Toast messageType="error" message={error}/>}
    </div>
      
    }
      
    </>
  );
}

export default Payment;
