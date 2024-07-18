import React from 'react'
import ReactDOM from 'react-dom/client'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './App'
import  store  from './redux/store'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './styles/index.scss'
import { ToastContainer } from 'react-toastify'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string
const stripePromise = loadStripe('pi_3PYME702JLx4rKB507o2HM1w_secret_a4PaUYYOtWeU3BspyaY61uiHH');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Elements stripe={stripePromise}>
     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
    </GoogleOAuthProvider>
    </Elements>
  </React.StrictMode>,
)

