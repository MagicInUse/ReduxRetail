import { configureStore } from '@reduxjs/toolkit';
import categorySlice from './slices/categorySlice';
import productSlice from './slices/productSlice';
import cartSlice from './slices/cartSlice';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    categories: categorySlice,
    products: productSlice,
    cart: cartSlice,
    auth: authSlice
  }
});