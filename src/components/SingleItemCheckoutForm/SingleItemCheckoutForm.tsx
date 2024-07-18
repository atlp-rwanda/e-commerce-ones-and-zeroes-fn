import { PaymentElement } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import axios from 'axios';

import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { CLIENT_URL } from "../../constants/api";
import { RootState } from "../../redux/store";
import Toast from "../Toast/Toast";
import './SingleItemCheckoutForm.scss';
import { BACKEND_URL } from "../../constants/api";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { checkoutObject } = useSelector((state: RootState) => state.singleItemOrder);

  const [message, setMessage] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const token = localStorage.getItem('token');
  console.log('object', checkoutObject);
  const orderId = checkoutObject?.order.orderId;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${CLIENT_URL}/users/dashboard`,
      },
      redirect: 'if_required'
    });

    if (error) {
      console.log('error', error);
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(`error: ${error.message}` || 'An error occurred');
        setShowToast(true);
      } else {
        setMessage("An unexpected error occurred.");
        setShowToast(true);
      }
      setIsProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      try {
        if (!orderId) {
          alert('Order ID is missing');
          return;
        }

        await axios.put(
          `${BACKEND_URL}/api/orders/${orderId}/confirm`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage("Payment successful!");
        setShowToast(true);
      } catch (err) {
        console.error('Error confirming order:', err);
        setMessage("Error confirming order.");
        setShowToast(true);
      }

      // Redirect to return_url after order confirmation
      window.location.href = `${CLIENT_URL}/users/dashboard`;
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} id="submit" className="pay-btn">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay Now"}
        </span>
      </button>
      {message && <Toast message={message} messageType={message.includes("error") ? "error" : "success"} />}
    </form>
  );
}
