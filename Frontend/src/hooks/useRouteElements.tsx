import React, { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import Main from '../layout/Main';
import SignUpLayout from '../layout/SignUpLayout/SignUpLayout';
import { paths } from '../constants/paths';

const Home = lazy(() => import('../pages/Home'));
const Contact = lazy(() => import('../pages/Contact'));
const About = lazy(() => import('../pages/About/About'));
const ProductList = lazy(() => import('../pages/ProductList'));
const SignUp = lazy(() => import('../pages/SignUp'));
const SignIn = lazy(() => import('../pages/SignIn'));
const Cart = lazy(() => import('../pages/Cart'))
const ProductDetails = lazy(() => import('../pages/ProductDetails'))

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
      path: paths.contact,
      element: (
        <Main>
          <Suspense fallback={<div>Loading...</div>}>
            <Contact />
          </Suspense>
        </Main>
      ),
    },
    {
      path: paths.about,
      element: (
        <Main>
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        </Main>
      ),
    },
    {
      path: paths.products,
      element: (
        <Main>
          <Suspense fallback={<div>Loading...</div>}>
            <ProductList />
          </Suspense>
        </Main>
      ),
    },
    {
      path: paths.cart,
      element: (
        <Main>
          <Suspense fallback={<div>Loading...</div>}>
            <Cart />
          </Suspense>
        </Main>
      )
    },
    {
      path: paths.productDetail,
      index: true,
      element: (
        <Main>
          <Suspense fallback={<div>Loading...</div>}>
            <ProductDetails />
          </Suspense>
        </Main>
      )
    },
    {
      path: paths.signup,
      element: (
        <SignUpLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <SignUp />
          </Suspense>
        </SignUpLayout>
      ),
    },
    {
      path: paths.signin,
      element: (
        <SignUpLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <SignIn />
          </Suspense>
        </SignUpLayout>
      ),
    },
  ]);

  return routesElememt;
};
