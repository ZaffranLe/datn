import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as api from "./api";
import * as userApi from "../profile/api";
import _ from "lodash";

export const messageSlice = createSlice({
    name: "message",
    initialState: {
        currentMessages: [],
        currentUser: null,
        messageList: [],
        isLoading: false,
        isMessageListLoading: false,
        isUserInfoLoading: false,
        isSendingMessage: false,
    },
    reducers: {
        setCurrentMessages: (state, action) => {
            state.currentMessages = action.payload;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        setMessageList: (state, action) => {
            state.messageList = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setMessageListLoading: (state, action) => {
            state.isMessageListLoading = action.payload;
        },
        setUserInfoLoading: (state, action) => {
            state.isUserInfoLoading = action.payload;
        },
        setProperty: (state, action) => {
            state[action.payload.name] = action.payload.value;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setCurrentMessages,
    setCurrentUser,
    setMessageList,
    setLoading,
    setMessageListLoading,
    setUserInfoLoading,
    setProperty,
} = messageSlice.actions;

function getAllByUserSlug(slug) {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const data = await api.getAllByUserSlug(slug);
            const sortedData = _.sortBy(data, ["createdAt"]);
            dispatch(setCurrentMessages(sortedData));
        } catch (e) {
            console.error(e);
        } finally {
            dispatch(setLoading(false));
        }
    };
}

function getUserBasicInfoBySlug(slug) {
    return async (dispatch) => {
        try {
            dispatch(setUserInfoLoading(true));
            const user = await userApi.getUserBasicInfoBySlug(slug);
            dispatch(setCurrentUser(user));
        } catch (e) {
            console.error(e);
        } finally {
            dispatch(setUserInfoLoading(false));
        }
    };
}

function getLatestMessages(page) {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const currentMessageList = state.message.messageList;
            dispatch(setMessageListLoading(true));
            const messages = await api.getLatestMessages(page);
            dispatch(setMessageList(currentMessageList.concat(messages)));
        } catch (e) {
            toast.error("Hệ thống gặp sự cố! Vui lòng thử lại sau.");
            console.error(e);
        } finally {
            dispatch(setMessageListLoading(false));
        }
    };
}

function sendMessage(info, currentMessages) {
    return async (dispatch) => {
        try {
            dispatch(setProperty({ name: "isSendingMessage", value: true }));
            const msg = await api.sendMessage(info);
            dispatch(setCurrentMessages([...currentMessages, { ...msg, createdAt: new Date() }]));
        } catch (e) {
            console.error(e);
        } finally {
            dispatch(setProperty({ name: "isSendingMessage", value: false }));
        }
    };
}

export { getAllByUserSlug, getLatestMessages, getUserBasicInfoBySlug, sendMessage };

export default messageSlice.reducer;
