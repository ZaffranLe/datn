import { createSlice } from "@reduxjs/toolkit";
import * as api from "./api";

export const messageSlice = createSlice({
    name: "message",
    initialState: {
        messages: [],
        user: null,
        isLoading: false,
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setMessages, setLoading } = messageSlice.actions;

function getAllByUserSlug(slug) {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const data = await api.getAllByUserSlug(slug);
            dispatch(setMessages(data));
        } catch (e) {
            console.error(e);
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export { getAllByUserSlug };

export default messageSlice.reducer;
