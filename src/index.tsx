import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import  store  from './redux/store'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './styles/index.scss'

// declaring google client id
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <App />
      {/* <ProductsPage /> */}
    </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)

