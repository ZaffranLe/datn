import { createSlice } from "@reduxjs/toolkit";
import * as api from "./api";
export const exploreSlice = createSlice({
    name: "explore",
    initialState: {
        layout: "swipe",
    },
    reducers: {
        setLayout: (state, action) => {
            state.layout = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setLayout } = exploreSlice.actions;

export default exploreSlice.reducer;
