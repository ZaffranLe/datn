import { createSlice } from "@reduxjs/toolkit";
import * as api from "./api";
export const provinceSlice = createSlice({
    name: "province",
    initialState: {
        provinces: [],
        isLoading: false,
    },
    reducers: {
        setProvinces: (state, action) => {
            state.provinces = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setProvinces, setLoading } = provinceSlice.actions;

function getAll() {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const data = await api.getAll();
            dispatch(setProvinces(data));
        } catch (e) {
            console.error(e);
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export { getAll };

export default provinceSlice.reducer;
