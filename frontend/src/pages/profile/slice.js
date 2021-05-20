import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as api from "./api";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        user: null,
        images: [],
        isLoading: false,
        isError: false,
        isFollowLoading: false,
        isFollowing: false,
        posts: [],
        isActionSucceed: false,
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
        setImages: (state, action) => {
            state.images = action.payload;
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setActionSucceed: (state, action) => {
            state.isActionSucceed = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser, setLoading, setError, setFollowLoading, setFollowing, setImages, setPosts, setActionSucceed } =
    profileSlice.actions;

function getUserBySlug(slug) {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(false));
            dispatch(setUser(null));
            const user = await api.getUserBySlug(slug);
            dispatch(setUser(user));
            dispatch(setImages([]));
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
            dispatch(setFollowing(false));
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
            toast.error("Hệ thống đang gặp sự cố, vui lòng thử lại sau.");
        } finally {
            dispatch(setFollowLoading(false));
        }
    };
}

function getImagesByUserId(id) {
    return async (dispatch) => {
        try {
            dispatch(setFollowing(true));
            const images = await api.getImagesByUserId(id);
            dispatch(setImages(images));
        } catch (e) {
            toast.error("Hệ thống đang gặp sự cố, vui lòng thử lại sau.");
        } finally {
            dispatch(setFollowing(false));
        }
    };
}

function getPostByUserId() {
    return async (dispatch, getState) => {
        try {
            const stateRedux = getState();
            const user = stateRedux.profile.user;
            const data = await api.getPostByUserId(user.id);
            dispatch(setPosts(data));
        } catch (e) {
            toast.error("Hệ thống đang gặp sự cố, vui lòng thử lại sau.");
        }
    };
}

function createPost(images, content) {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            await api.createPost(images, content);
            dispatch(setActionSucceed(true));
        } catch (e) {
            toast.error("Hệ thống đang gặp sự cố, vui lòng thử lại sau.");
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export { getUserBySlug, changeFollowUser, checkFollowUser, getImagesByUserId, createPost, getPostByUserId };

export default profileSlice.reducer;
