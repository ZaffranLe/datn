import { createSlice } from "@reduxjs/toolkit";
import * as api from "./api";
export const genderSlice = createSlice({
    name: "gender",
    initialState: {
        genders: [],
        isLoading: false,
    },
    reducers: {
        setGenders: (state, action) => {
            state.genders = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setGenders, setLoading } = genderSlice.actions;

function getAll() {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const data = await api.getAll();
            dispatch(setGenders(data));
        } catch (e) {
            console.error(e);
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export { getAll };

export default genderSlice.reducer;
