import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Route.jsx'
import { WishlistProvider } from './pages/Providers/WishListProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WishlistProvider>
    <RouterProvider router={router} />
    </WishlistProvider>
  </StrictMode>,
)
