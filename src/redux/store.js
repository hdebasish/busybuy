import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/authReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer } from "./reducers/orderReducer";

export const store = configureStore({
    reducer: {
        userReducer,
        cartReducer,
        orderReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});