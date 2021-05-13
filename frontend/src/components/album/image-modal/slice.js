import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as api from "./api";

export const imageModalSlice = createSlice({
    name: "imageModal",
    initialState: {
        isLoading: false,
        image: null,
        isOpen: false,
        idImage: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setImage: (state, action) => {
            state.image = action.payload;
        },
        setOpen: (state, action) => {
            state.isOpen = action.payload;
        },
        setIdImage: (state, action) => {
            state.idImage = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setLoading, setImage, setOpen, setIdImage } = imageModalSlice.actions;

function openModal(id) {
    return (dispatch) => {
        dispatch(setIdImage(id));
        dispatch(setOpen(true));
    };
}

function getImage(id) {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const image = await api.getImage(id);
            dispatch(setImage(image));
        } catch (e) {
            dispatch(setImage(null));
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export { getImage, openModal };

export default imageModalSlice.reducer;
