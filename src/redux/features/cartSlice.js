import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity, price, discount } = action.payload;
      const existingItem = state.find((item) => item.id === id);

      const discountAmount = discount ? (price * discount) / 100 : 0;
      const finalPrice = price - discountAmount;

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.push({
          ...action.payload,
          price,
          finalPrice,
          quantity,
          discount: discount || 0,
        });
      }
    },

    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },

    deleteCart: () => [],

    editCartProduct: (state, action) => {
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    },
  },
});

export const { addToCart, removeFromCart, editCartProduct, deleteCart } =
  cartSlice.actions;
export default cartSlice.reducer;
