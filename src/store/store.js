import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./slice/loaderSlice";

export const store = configureStore({
    reducer: {
        loader: loaderReducer,
    },
});
