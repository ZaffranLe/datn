import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as api from "./api";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        user: null,
        isLoading: false,
        isError: false,
        isFollowLoading: false,
        isFollowing: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setFollowLoading: (state, action) => {
            state.isFollowLoading = action.payload;
        },
        setError: (state, action) => {
            state.isError = action.payload;
        },
        setFollowing: (state, action) => {
            state.isFollowing = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser, setLoading, setError, setFollowLoading, setFollowing } = profileSlice.actions;

function getUserBySlug(slug) {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(false));
            dispatch(setUser(null));
            const user = await api.getUserBySlug(slug);
            dispatch(setUser(user));
        } catch (e) {
            dispatch(setError(true));
        } finally {
            dispatch(setLoading(false));
        }
    };
}

function checkFollowUser(id) {
    return async (dispatch) => {
        try {
            dispatch(setFollowLoading(true));
            const isFollowing = await api.checkFollowUser(id);
            dispatch(setFollowing(isFollowing));
        } catch (e) {
            toast.error("Hệ thống đang gặp sự cố, vui lòng thử lại sau/");
        } finally {
            dispatch(setFollowLoading(false));
        }
    };
}

function changeFollowUser(id) {
    return async (dispatch) => {
        try {
            dispatch(setFollowLoading(true));
            const isFollowing = await api.changeFollowUser(id);
            dispatch(setFollowing(isFollowing));
        } catch (e) {
            toast.error("Hệ thống đang gặp sự cố, vui lòng thử lại sau/");
        } finally {
            dispatch(setFollowLoading(false));
        }
    };
}

export { getUserBySlug, changeFollowUser, checkFollowUser };

export default profileSlice.reducer;
