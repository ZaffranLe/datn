import { createSlice } from "@reduxjs/toolkit";
import * as api from "./api";
export const hobbySlice = createSlice({
    name: "hobby",
    initialState: {
        hobbies: [],
        isLoading: false,
    },
    reducers: {
        setHobbies: (state, action) => {
            state.hobbies = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setHobbies, setLoading } = hobbySlice.actions;

function getAll() {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const data = await api.getAll();
            dispatch(setHobbies(data));
        } catch (e) {
            console.error(e);
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export { getAll };

export default hobbySlice.reducer;
