import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      const parsedStock = Number(quantity) || 1;

      if (existingItem) {
        existingItem.quantity += parsedStock;
      } else {
        state.push({ ...action.payload, stock: parsedStock });
      }
    },

    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },

    deleteCart: () => {
      return [];
    },

    editCartProduct: (state, action) => {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: action.payload.quantity,
          };
        }
        return item;
      });
    },
  },
});

export const { addToCart, removeFromCart, editCartProduct, deleteCart } =
  cartSlice.actions;
export default cartSlice.reducer;
