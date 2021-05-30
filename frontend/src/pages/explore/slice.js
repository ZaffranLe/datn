import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as api from "./api";
import * as profileApi from "../profile/api";
export const exploreSlice = createSlice({
    name: "explore",
    initialState: {
        layout: "grid",
        users: [],
    },
    reducers: {
        setLayout: (state, action) => {
            state.layout = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setLayout, setUsers } = exploreSlice.actions;

function changeSkipUser(id) {
    return async (dispatch) => {
        try {
            const isSkipped = await api.changeSkipUser(id);
        } catch (e) {
            toast.error("Hệ thống đang gặp sự cố, vui lòng thử lại sau.");
        }
    };
}

function getUserSuggestions() {
    return async (dispatch) => {
        try {
            const users = await api.getUserSuggestions();
            dispatch(setUsers(users));
        } catch (e) {
            toast.error("Hệ thống đang gặp sự cố, vui lòng thử lại sau.");
        }
    };
}

export { changeSkipUser, getUserSuggestions };

export default exploreSlice.reducer;
