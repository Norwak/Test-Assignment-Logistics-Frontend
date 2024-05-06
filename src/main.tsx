import React, { Dispatch, SetStateAction, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './layout/Root.layout';
import HomePage from './pages/Home.page';
import { offersLoader } from './components/tables/OffersFrontTable';
import ErrorPage from './pages/Error.page';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider } from '@gravity-ui/uikit';
import Loading from './components/Loading';
import AdminOffersPage from './pages/AdminOffers.page';
import { deleteOfferAction } from './components/tables/OffersAdminTable';
import EditOfferPage, { editOfferLoader } from './pages/EditOffer.page';
import { offerFormAction } from './components/forms/OfferForm';
import NewOfferPage, { newOfferLoader } from './pages/NewOffer.page';


const router = (setLoaded: Dispatch<SetStateAction<boolean>>) => createBrowserRouter([
  {
    path: '/',
    element: <RootLayout setLoaded={setLoaded} />,
    // errorElement: <ErrorPage />,
    children: [
      {index: true, element: <HomePage />, loader: offersLoader},
      {
        path: 'admin/',
        action: deleteOfferAction,
        children: [
          {index: true, element: <AdminOffersPage />, loader: offersLoader},
          {path: 'new/', element: <NewOfferPage />, loader: newOfferLoader, action: offerFormAction},
          {path: ':id/edit/', element: <EditOfferPage />, loader: editOfferLoader, action: offerFormAction}
        ],
      },
    ]
  }
]);


function Root() {
  const [pageLoaded, setLoaded] = useState<boolean>(false);
  
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme="light">
          <RouterProvider router={router(setLoaded)} />
          {!pageLoaded && <Loading />}
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}


ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);