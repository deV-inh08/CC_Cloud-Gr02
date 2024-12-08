import React from 'react'
import QuantityController from '../../components/QuantityController';
import ViewAllProduct from '../../components/ViewAllProduct';
import { Link } from 'react-router-dom';
import { paths } from '../../constants/paths';

const Cart = () => {
  return (
    <section className='mx-auto container'>
      <div className='mt-[100px] grid grid-cols-12 gap-4 '>
        <div className='col-span-3 justify-items-start'>
          <p>Product</p>
        </div>
        <div className='col-span-3 justify-items-center'>
          <p>Price</p>
        </div>
        <div className='col-span-3 justify-items-center'>
          <p>Quantity</p>
        </div>
        <div className='col-span-3 justify-items-end'>
          <p>Subtotal</p>
        </div>
      </div>
      <div className='mt-[100px] grid grid-cols-12 gap-4'>
      <div className='col-span-3 justify-items-start'>
          <img src="" alt="" />
          <p>LCD Monitor</p>
        </div>
        <div className='col-span-3 justify-items-center'>
          <p>$670</p>
        </div>
        <div className='col-span-3 justify-items-center'>
          <QuantityController></QuantityController>
        </div>
        <div className='col-span-3 justify-items-end'>
          <p>$670</p>
        </div>
      </div>
      <div className='mt-[100px] flex justify-between'>
        <Link to={paths.home} className='border border-black px-6 py-4 hover:bg-primaryColor hover:text-white hover:border-none transition-all'>Return To Shop</Link>
        <button className='border border-black px-6 py-4'>Update Cart</button>
      </div>
      <div className='mt-[100px] grid grid-cols-12 gap-10'>
        <div className='col-span-5'>
        <input 
          type="text" 
          className='border border-black py-4 mr-3 rounded-md pl-3'
          placeholder='Coupon Code'  
        />
        <ViewAllProduct value='Apply Coupon'></ViewAllProduct>
        </div>
        <div className='col-span-6 justify-items-end'>
          <section className='border border-black flex flex-col md:w-[470px] gap-7 px-3 py-3'>
            <p className='font-medium text-2xl'>Cart Total</p>
            <div className='flex justify-between'>
              <p>Subtotal:</p>
              <p>$1605$</p>
            </div>
            <div className='h-[1px] bg-gray-400 rounded-md -mt-4'></div>
            <div className='flex justify-between'>
              <p>Shipping:</p>
              <p>Free</p>
            </div>
            <div className='h-[1px] bg-gray-400 rounded-md -mt-4'></div>
            <div className='flex justify-between'>
              <p>Total:</p>
              <p>$1750</p>
            </div>
            <ViewAllProduct value='Process to checkout'></ViewAllProduct>
          </section>
        </div>
      </div>
    </section>
   
    
  )
}

export default Cart;