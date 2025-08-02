import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 100,
};

export const counterSlice = createSlice({
    name: "counter",
    initialState: initialState,
    reducers: {
       // kumpulan fungsi untuk memanipulasi 'counter' (ceritanya) 
       increment: (state) => {
        state.value += 1;
       },
       decrement: (state) => {
        state.value -=1;
       },
       incrementByAmount: (state, action) => {
        state.value += action.payload;
       },
    },
});

export const { increment, decrement, incrementByAmount} = counterSlice.actions;
export default counterSlice.reducer;