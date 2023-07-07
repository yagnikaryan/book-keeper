import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ProSidebarProvider } from "react-pro-sidebar"
import { BrowserRouter } from "react-router-dom"



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>
      <ProSidebarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProSidebarProvider>
    </div>
  </React.StrictMode>,
)
