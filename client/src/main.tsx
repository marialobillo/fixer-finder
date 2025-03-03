import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

const domain = "dev-elimurwm3z1x314r.us.auth0.com";
const clientId = "xZjWeP2yyTbLYkoSDXrxHlX65wHieeEd";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
    <BrowserRouter>
      <App />
      </BrowserRouter>
      </Auth0Provider>
  </React.StrictMode>,
)
