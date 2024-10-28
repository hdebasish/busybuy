import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../database/firebaseConfig";

const initialState = {
    cart : []
}

export const setCartAsync = createAsyncThunk("cart/setCart", async (payload) => {
    return await setDoc(doc(db, "carts", payload.uid), { cart: payload.cart });
})

export const resetCartAsync = createAsyncThunk("cart/resetCart", async (payload) => {
    return await setDoc(doc(db, "carts", payload.uid), { cart: [] });
})

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        setInitialState: (state, action) => {
            state.cart = [ ...action.payload ];
        }
    }
});

export const cartReducer = cartSlice.reducer;

export const cartActions = cartSlice.actions;

export const cartSelector = (state) => state.cartReducer;