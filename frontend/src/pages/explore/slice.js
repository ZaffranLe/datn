import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as api from "./api";
import * as profileApi from "../profile/api";
export const exploreSlice = createSlice({
    name: "explore",
    initialState: {
        users: [],
        currentUser: null,
        isLoading: false,
        isSkippedBtnLoading: false,
        isFollowedBtnLoading: false,
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setSkippedBtnLoading: (state, action) => {
            state.isSkippedBtnLoading = action.payload;
        },
        setFollowedBtnLoading: (state, action) => {
            state.isFollowedBtnLoading = action.payload;
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
export const { setUsers, setLoading, setSkippedBtnLoading, setCurrentUser, skipUser, setFollowedBtnLoading } = exploreSlice.actions;

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

function changeFollowUser(id) {
    return async (dispatch) => {
        try {
            dispatch(setFollowedBtnLoading(true));
            await api.changeFollowUser(id);
            dispatch(skipUser(id));
        } catch (e) {
            toast.error("Hệ thống đang gặp sự cố, vui lòng thử lại sau.");
        } finally {
            dispatch(setFollowedBtnLoading(false));
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

export { changeSkipUser, getUserSuggestions, changeFollowUser };

export default exploreSlice.reducer;
