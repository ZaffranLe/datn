import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as api from "./api";
import * as profileApi from "../profile/api";
export const exploreSlice = createSlice({
    name: "explore",
    initialState: {
        layout: "grid",
        users: [],
        currentUser: null,
        isLoading: false,
        isSkippedBtnLoading: false,
    },
    reducers: {
        setLayout: (state, action) => {
            state.layout = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setSkippedBtnLoading: (state, action) => {
            state.isSkippedBtnLoading = action.payload;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        skipUser: (state, action) => {
            const newUsers = state.users.filter((user) => user.id != action.payload);
            state.users = newUsers;
            state.currentUser = newUsers[0];
        },
    },
});

// Action creators are generated for each case reducer function
export const { setLayout, setUsers, setLoading, setSkippedBtnLoading, setCurrentUser, skipUser } =
    exploreSlice.actions;

function changeSkipUser(id) {
    return async (dispatch) => {
        try {
            dispatch(setSkippedBtnLoading(true));
            await api.changeSkipUser(id);
            dispatch(skipUser(id));
        } catch (e) {
            toast.error("Hệ thống đang gặp sự cố, vui lòng thử lại sau.");
        } finally {
            dispatch(setSkippedBtnLoading(false));
        }
    };
}

function getUserSuggestions() {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const users = await api.getUserSuggestions();
            dispatch(setUsers(users));
            if (users.length > 0) {
                dispatch(setCurrentUser(users[0]));
            }
        } catch (e) {
            toast.error("Hệ thống đang gặp sự cố, vui lòng thử lại sau.");
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export { changeSkipUser, getUserSuggestions };

export default exploreSlice.reducer;
