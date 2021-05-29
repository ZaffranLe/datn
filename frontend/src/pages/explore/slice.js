import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as api from "./api";
import * as profileApi from "../profile/api";
export const exploreSlice = createSlice({
    name: "explore",
    initialState: {
        layout: "swipe",
        currentUser: null,
    },
    reducers: {
        setLayout: (state, action) => {
            state.layout = action.payload;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setLayout, setCurrentUser } = exploreSlice.actions;

function changeSkipUser(id) {
    return async (dispatch) => {
        try {
            const isSkipped = await api.changeSkipUser(id);
        } catch (e) {
            toast.error("Hệ thống đang gặp sự cố, vui lòng thử lại sau.");
        }
    };
}

export { changeSkipUser }

export default exploreSlice.reducer;
