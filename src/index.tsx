import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import  store  from './redux/store'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './styles/index.scss'

// declaring google client id
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "389689063131-chan42cub5t69u7qetv7otafqfb31bhm.apps.googleusercontent.com"
console.log(GOOGLE_CLIENT_ID)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <App />
    </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
