import { configureStore } from "@reduxjs/toolkit";
import websiteSlice from "./slices/websiteSlice";


const store = configureStore({
    reducer: {
        websiteSlice,
    }
})

export default store
