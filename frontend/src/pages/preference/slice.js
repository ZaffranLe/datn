import { createSlice } from "@reduxjs/toolkit";
import * as api from "./api";
export const preferenceSlice = createSlice({
    name: "preference",
    initialState: {
        preferences: [],
        isLoading: false,
    },
    reducers: {
        setPreferences: (state, action) => {
            state.preferences = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setPreferences, setLoading } = preferenceSlice.actions;

function getAll() {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const data = await api.getAll();
            dispatch(setPreferences(data));
        } catch (e) {
            console.error(e);
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export { getAll };

export default preferenceSlice.reducer;
