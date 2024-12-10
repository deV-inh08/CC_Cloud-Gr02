import React, { lazy, Suspense, useContext } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import Main from '../layout/Main';
import SignUpLayout from '../layout/SignUpLayout/SignUpLayout';
import { paths } from '../constants/paths';
import { AppContext } from '../contexts/app.context';

const Home = lazy(() => import('../pages/Home'));
const Contact = lazy(() => import('../pages/Contact'));
const About = lazy(() => import('../pages/About/About'));
const ProductList = lazy(() => import('../pages/ProductList'));
const SignUp = lazy(() => import('../pages/SignUp'));
const SignIn = lazy(() => import('../pages/SignIn'));
const Cart = lazy(() => import('../pages/Cart'))
const ProductDetails = lazy(() => import('../pages/ProductDetails'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet/> : <Navigate to="/signin"/>
}

function RejectRouted() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet/> : <Navigate to='/'/>
}

export const useRouteElements = () => {
  const routesElememt = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <Main>
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        </Main>
      ),
    },
    {
      path: '',
      element: <RejectRouted></RejectRouted>,
      children: [
        {
          path: paths.signin,
          element: (
            <SignUpLayout>
              <Suspense fallback={<div>Loading...</div>} >
                <SignIn />
              </Suspense>
            </SignUpLayout>
          )
        },
        {
          path: paths.signup,
          element: (
            <SignUpLayout>
                <SignUp />
            </SignUpLayout>
          )
        }
      ]
    },

    {
      path: '',
      element: <ProtectedRoute></ProtectedRoute>,
      children: [
        {
          path: paths.products,
          element: (
            <Main>
              <Suspense fallback={<div>Loading...</div>} >
                <ProductList></ProductList>
              </Suspense>
            </Main>
          ),
          
        },
        {
          path: paths.contact,
          element: (
            <Main>
              <Suspense fallback={<div>Loading...</div>} >
                <Contact></Contact>
              </Suspense>
            </Main>
          ),
        },
        {
          path: paths.productDetail,
          index: true,
          element: (
            <Main>
              <Suspense fallback={<div>Loading...</div>} >
                <ProductDetails></ProductDetails>
              </Suspense>
            </Main>
          ),
        },
        {
          path: paths.cart,
          element: (
            <Main>
              <Suspense fallback={<div>Loading...</div>} >
                <Cart></Cart>
              </Suspense>
            </Main>
          ),
        },
        {
          path: paths.about,
          element: (
            <Main>
              <Suspense fallback={<div>Loading...</div>} >
                <About></About>
              </Suspense>
            </Main>
          ),
        },
      ]
    },



    // {
    //   path: paths.contact,
    //   element: (
    //     <Main>
    //       <Suspense fallback={<div>Loading...</div>}>
    //         <Contact />
    //       </Suspense>
    //     </Main>
    //   ),
    // },
    // {
    //   path: paths.about,
    //   element: (
    //     <Main>
    //       <Suspense fallback={<div>Loading...</div>}>
    //         <About />
    //       </Suspense>
    //     </Main>
    //   ),
    // },
    // {
    //   path: paths.products,
    //   element: (
    //     <Main>
    //       <Suspense fallback={<div>Loading...</div>}>
    //         <ProductList />
    //       </Suspense>
    //     </Main>
    //   ),
    // },
    // {
    //   path: paths.cart,
    //   element: (
    //     <Main>
    //       <Suspense fallback={<div>Loading...</div>}>
    //         <Cart />
    //       </Suspense>
    //     </Main>
    //   )
    // },
    // {
    //   path: paths.productDetail,
    //   index: true,
    //   element: (
    //     <Main>
    //       <Suspense fallback={<div>Loading...</div>}>
    //         <ProductDetails />
    //       </Suspense>
    //     </Main>
    //   )
    // },
   
  ]);

  return routesElememt;
};
