import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as api from "./api";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        user: null,
        isLoading: false,
        isError: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.isError = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser, setLoading, setError } = profileSlice.actions;

function getUserBySlug(slug) {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(false));
            dispatch(setUser(null));
            const user = await api.getUserBySlug(slug);
            dispatch(setUser(user));
        } catch (e) {
            dispatch(setError(true));
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export { getUserBySlug };

export default profileSlice.reducer;
