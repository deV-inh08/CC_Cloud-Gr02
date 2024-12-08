import React from 'react'
import { PropsTypeLayout } from '../../types/PropTypeLayout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const CartLayout = ({ children }: PropsTypeLayout) => {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  )
}

export default CartLayout;