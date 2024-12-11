import React, { useState } from 'react'
import ViewAllProduct from '../../components/ViewAllProduct';
import { Link } from 'react-router-dom';
import { paths } from '../../constants/paths';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../CartStore';
import { deleteCart, updateCartQuantity } from './CartReducer';
import InputNumber from '../../components/InputNumber';


const Cart = () => {
  const getCartList = useSelector((state: RootState) => state.Cart.cartList);
  let buyCount = 0;
  const [updateCart, setUpdateCart] = useState<boolean>(false);
  
  const dispath = useDispatch();

  const cartsTotal = getCartList.reduce((total, item) => {
    return ((total + (item.price - Math.floor(item.price) * (item.discountPercentage / 100))) * item.quantity).toFixed(1)
  }, 0);

  const handleUpdateCart = () => {
    setUpdateCart(!updateCart)
  };

  const handleDeleteProduct = (id: number) => {
    dispath(deleteCart(id))
  };

  const handleUpdateCartQuantity = (id: number ,quantity: number) => {
    dispath(updateCartQuantity({ id, quantity }))
  };

  const handleIncrease = (id: number) => { 
    ++buyCount;
    console.log(id, buyCount)
    handleUpdateCartQuantity(id, buyCount)
  };

  return (
    <section className='mx-auto container'>
      <div className='mt-[100px] grid grid-cols-12 gap-4 font-bold text-primaryColor text-xl'>
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
      <div className='mt-[100px] grid grid-cols-12 gap-4 items-center'>
        {getCartList && getCartList.length > 0 && getCartList.map((item, index) => {
          return (
            <>
              <div key={index} className='relative flex gap-2 items-center col-span-3 justify-items-start'>
                <img src={item.images[0]} alt="Product" className='w-[100px]' />
                <p>{item.title}</p>
                {updateCart && (
                  <div onClick={() => { handleDeleteProduct(item.id) }} className='absolute top-0 cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none">
                      <circle cx={12} cy={12} r={9} fill="#DB4444" />
                      <path d="M9 15L12 12M15 9L11.9994 12M11.9994 12L9 9M12 12L15 15" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
              <div className='col-span-3 justify-items-center'>
                <p>${(item.price - Math.floor(item.price) * (item.discountPercentage / 100)).toFixed(1)}</p>
              </div>
              <div className='col-span-3 justify-items-center'>
                <div className={"flex items-center"}>
                  <button  className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    </svg>
                  </button>
                  <InputNumber
                    value={item.quantity}
                    className=''
                    classNameError='hidden'
                    classNameInput='h-8 w-14 border-t border-b border-gray-300 text-center outline-none'
                  >
                  </InputNumber>
                  <button onClick={() => handleIncrease(item.id)} className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className='col-span-3 justify-items-end'>
                <p>${((item.price - Math.floor(item.price) * (item.discountPercentage / 100)) * (item.quantity)).toFixed(1)}</p>
              </div></>
          )
        })}
      </div>
      <div className='mt-[100px] flex justify-between'>
        <Link to={paths.home} className='border border-black px-6 py-4 hover:bg-primaryColor hover:text-white hover:border-none transition-all'>Return To Shop</Link>
        <button onClick={handleUpdateCart} className='border border-black px-6 py-4 hover:bg-primaryColor hover:text-white hover:border-none transition-all'>Update Cart</button>
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
              <p>${cartsTotal}</p>
            </div>
            <div className='h-[1px] bg-gray-400 rounded-md -mt-4'></div>
            <div className='flex justify-between'>
              <p>Shipping:</p>
              <p>Free</p>
            </div>
            <div className='h-[1px] bg-gray-400 rounded-md -mt-4'></div>
            <div className='flex justify-between text-xl'>
              <p>Total:</p>
              <p className=' text-primaryColor font-medium'>${cartsTotal}</p>
            </div>
            <ViewAllProduct value='Process to checkout'></ViewAllProduct>
          </section>
        </div>
      </div>
    </section>


  )
}

export default Cart;