import { createAction, createReducer } from "@reduxjs/toolkit"
import { CartType } from "../../types/Cart"

interface InitialStateType {
  cartList: CartType[]
}

interface updateCartQuantity {
  id: number
  quantity: number
}

const initialStateType: InitialStateType = {
  cartList: []
}

export const addCart = createAction<CartType>('/Cart/addCart');

export const deleteCart = createAction<number>('/Cart/deleteCart');

export const updateCartQuantity = createAction<updateCartQuantity>('/cart/updateCart')

export const cartReducer = createReducer(initialStateType, builder => {
  builder
    .addCase(addCart, (state, action) => {
      const newCart = action.payload;
      const existingCart = state.cartList.find(cart => cart.id === newCart.id)
      if(existingCart) {
        existingCart.quantity += newCart.quantity
      } else {
        state.cartList.push(newCart)
      }
      
    })
    .addCase(deleteCart, (state, action) => {
      const id: number = action.payload;
      const foundCartIndex = state.cartList.findIndex(cart => cart.id === id);
      if(foundCartIndex !== -1) {
        state.cartList.splice(foundCartIndex, 1)
      }
    })
    .addCase(updateCartQuantity, (state, action) => {
      const { id, quantity } = action.payload;
      const existingCart = state.cartList.find(cart => cart.id === id);
      if(existingCart) {
        existingCart.quantity += quantity
      }
    })
});


