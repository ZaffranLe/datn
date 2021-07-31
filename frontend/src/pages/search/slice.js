import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as api from "./api";
export const searchSlice = createSlice({
    name: "search",
    initialState: {
        users: [],
        isLoading: false,
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUsers, setLoading } = searchSlice.actions;

function searchUser(name) {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const users = await api.searchUser(name);
            dispatch(setUsers(users));
        } catch (e) {
            toast.error("Hệ thống đang gặp sự cố, vui lòng thử lại sau.");
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export { searchUser };

export default searchSlice.reducer;
