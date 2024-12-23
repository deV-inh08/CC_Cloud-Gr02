import { configureStore } from "@reduxjs/toolkit"
import { cartReducer } from "./pages/Cart/CartReducer"

export const store = configureStore({
  reducer: {
    "Cart": cartReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
