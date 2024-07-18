import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/SingleItemCheckoutForm/SingleItemCheckoutForm"
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import NavBar from "../../components/NavBar";
import { STRIPE_PUBLIC_KEY } from "../../constants/api";
import './BuySingleItem.scss'
import { RootState } from "../../redux/store";
import { BACKEND_URL } from "../../constants/api";

function BuySingleItem() {
  const stripePromise = loadStripe(STRIPE_PUBLIC_KEY as string);
  const { checkoutObject } = useSelector((state: RootState) => state.singleItemOrder);
  const clientSecret = checkoutObject?.paymentIntent.client_secret;
  const { productId } = useParams();

  const token = localStorage.getItem('token');
  const navigate = useNavigate()

  const [userAddress, setUserAddress] = useState({
    country: '',
    province: '',
    district: '',
    sector: '',
    street: ''
  });

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    images: ['']
  });

  useEffect(() => {
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
    if(!checkoutObject) {
      navigate(`/product/${productId}`)
  }

    fetchAddressId();
  }, []);
  

  useEffect(() => {
    
    const fetchProduct = async () => {
      try {
        const productResponse = await axios.get(`${BACKEND_URL}/api/products/${productId}`);
        setProduct(productResponse.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (productId !== '') {
      fetchProduct();
    }
  }, [productId]);
  
  console.log('product', product)
  console.log('productId', checkoutObject)

  return (
    <>
      <NavBar />
      {
        checkoutObject && 

        <div>
        <div className="checkout-page-wrapper">
          <h2 className='page-title '>Buy This Item</h2>
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
                  {clientSecret && stripePromise && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <CheckoutForm />
                    </Elements>
                  )}
                </div>
              </div>
            </div>
            <div className="order-summary">
              <h2 className='checkout-title'>Order summary</h2>
              <div className="cart-item-list">
                {product.name ? (
                  <div className="cart-item">
                    <img src={product.images[0]} alt={product.name} />
                    <div>
                      <div>
                        <h4 className="product-name">{product.name}</h4>
                        <p>{product.description}</p>
                      </div>
                      <p className="order-product-details">
                        <span>Unit Price: <strong>{product.price}</strong> </span>
                        <span>Quantity: {checkoutObject?.orderProduct.quantity}</span>
                        <span>Sub Total: <strong>{((product.price) as number) *  (checkoutObject?.orderProduct.quantity) as number} RWF</strong></span>
                        </p>
                    </div>
                  </div>
                ) : (
                  <p>Loading Product...</p>
                )}
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
      </div>
      }
      
    </>
  );
}

export default BuySingleItem;
