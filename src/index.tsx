import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import  store  from './redux/store'
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Provider } from 'react-redux'
import './styles/index.scss'
const CLIENT_ID = '626734756498-e4q33bbc6fsklatfunksr4o0g5nl0qfc.apps.googleusercontent.com';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <Provider store={store}>
      <App />
    </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
