import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    cartOpen: false
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartOpen = true;
      const itemInCart = state.cart.find(item => item._id === action.payload._id);
      if (itemInCart) {
        itemInCart.purchaseQuantity++;
      } else {
        state.cart.push({ ...action.payload, purchaseQuantity: 1 });
      }
    },
    addMultipleToCart: (state, action) => {
      state.cart = [...state.cart, ...action.payload];
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item._id !== action.payload);
    },
    updateCartQuantity: (state, action) => {
      const { _id, purchaseQuantity } = action.payload;
      state.cart = state.cart.map(item =>
        item._id === _id ? { ...item, purchaseQuantity } : item
      );
    },
    clearCart: (state) => {
      state.cartOpen = false;
      state.cart = [];
    },
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    }
  }
});

export const { 
  addToCart, 
  addMultipleToCart,
  removeFromCart, 
  updateCartQuantity, 
  clearCart, 
  toggleCart 
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;