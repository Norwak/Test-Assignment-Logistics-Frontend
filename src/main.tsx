import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './layout/Root.layout';
import HomePage from './pages/Home.page';
import Error404Page from './pages/Error404.page';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error404Page />,
    children: [
      {index: true, element: <HomePage />}
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
