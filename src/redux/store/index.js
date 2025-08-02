import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice.js";
import productReducer from "../features/product/productSlice.js";
import categoryReducer from "../features/category/categorySlice.js";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    category: categoryReducer,
  },
});

export default store;
