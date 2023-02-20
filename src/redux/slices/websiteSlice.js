import { createSlice } from "@reduxjs/toolkit";


const setUser = (state, action) => {
    if (action.payload._id) {
        state.user = action.payload
    }
}


const initialState = { 
    user: {
        step: ""
    }
}

const websiteSlice = createSlice({
  name: "websiteSlice",
  initialState,
  reducers: {
    setUser,
  },
});

export const {
    setUser: setUserAction
} = websiteSlice.actions

export default websiteSlice.reducer


