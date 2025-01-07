import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    currentProduct: null
  },
  reducers: {
    updateProducts: (state, action) => {
      state.products = action.payload;
    },
    updateCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    }
  }
});

export const { updateProducts, updateCurrentProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;