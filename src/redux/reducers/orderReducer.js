import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../database/firebaseConfig";

const initialState = {
    order : []
}

export const setOrderAsync = createAsyncThunk("order/setOrder", async (payload) => {
    return await setDoc(doc(db, "orders", payload.uid), { order: payload.order });
})


const oderSlice = createSlice({
    name : 'order',
    initialState,
    reducers : {
        setInitialState: (state, action) => {
            if(action.payload){
                state.order = [ ...action.payload ];
            }
        }
    }
});

export const orderReducer = oderSlice.reducer;

export const orderActions = oderSlice.actions;

export const orderSelector = (state) => state.orderReducer;