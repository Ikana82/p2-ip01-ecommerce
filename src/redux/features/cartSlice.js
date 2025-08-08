import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity, price, discount, name, imgUrl, size, color } =
        action.payload;

      const existingItem = state.find((item) => item.id === id);

      const discountAmount = discount ? (price * discount) / 100 : 0;
      const finalPrice = price - discountAmount;

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.finalPrice = finalPrice;
        existingItem.discount = discount || 0;
        existingItem.size = size || existingItem.size;
        existingItem.color = color || existingItem.color;
        existingItem.name = name || existingItem.name;
        existingItem.imgUrl = imgUrl || existingItem.imgUrl;
      } else {
        state.push({
          id,
          name,
          imgUrl,
          size,
          color,
          quantity,
          price,
          finalPrice,
          discount: discount || 0,
        });
      }
    },

    editCartProduct: (state, action) => {
      return state.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              quantity: action.payload.quantity,
            }
          : item
      );
    },

    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },

    deleteCart: () => [],
  },
});

export const { addToCart, removeFromCart, editCartProduct, deleteCart } =
  cartSlice.actions;
export default cartSlice.reducer;
