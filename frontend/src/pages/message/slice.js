import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as api from "./api";
import * as userApi from "../profile/api";
import _ from "lodash";
import { getUserInfoFromToken } from "../../common/common";
import produce from "immer";

export const messageSlice = createSlice({
    name: "message",
    initialState: {
        currentMessages: [],
        currentUser: null,
        messageList: [],
        isLoading: false,
        isMessageListLoading: false,
        isUserInfoLoading: false,
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

function sendMessage(info, socket) {
    return async (dispatch) => {
        try {
            const msg = await api.sendMessage(info);
            socket.emit("send-msg", {
                msg,
            });
            dispatch(appendMessage(msg));
        } catch (e) {
            console.error(e);
        }
    };
}

function appendMessage(msg) {
    return async (dispatch, getState) => {
        const appState = getState();
        const { currentMessages, currentUser, messageList } = appState.message;
        const userInfo = getUserInfoFromToken();
        if (userInfo.id === msg.idUserFrom && currentUser.id === msg.idUserTo) {
            // sending msg to other
            dispatch(
                setCurrentMessages([
                    ...currentMessages,
                    { ...msg, createdAt: new Date().toISOString() },
                ])
            );
            dispatch(
                appendMessageList({
                    ...msg,
                    id: new Date().getTime(),
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    fromSelf: true,
                    avatar: currentUser.avatar,
                    slug: currentUser.slug,
                    isSeen: 0,
                    createdAt: new Date().toISOString(),
                })
            );
        } else if (currentUser && currentUser.id === msg.idUserFrom) {
            // receive msg from currentUserMessaging
            dispatch(
                setCurrentMessages([
                    ...currentMessages,
                    { ...msg, createdAt: new Date().toISOString() },
                ])
            );
            dispatch(
                appendMessageList({
                    ...msg,
                    id: new Date().getTime(),
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    fromSelf: false,
                    avatar: currentUser.avatar,
                    slug: currentUser.slug,
                    isSeen: 1,
                    createdAt: new Date().toISOString(),
                })
            );
        } else {
            // receive msg from someone
            let currentUserInfo = {};
            const existMsg = messageList.find(
                (_msg) =>
                    (_msg.idUserFrom === msg.idUserFrom && _msg.idUserTo === msg.idUserTo) ||
                    (_msg.idUserTo === msg.idUserFrom && _msg.idUserFrom === msg.idUserTo)
            );
            if (!existMsg) {
                currentUserInfo = await userApi.getUserBasicInfoById(msg.idUserFrom);
            } else {
                currentUserInfo = existMsg;
            }
            dispatch(
                appendMessageList({
                    ...msg,
                    id: new Date().getTime(),
                    firstName: currentUserInfo.firstName,
                    lastName: currentUserInfo.lastName,
                    fromSelf: false,
                    avatar: currentUserInfo.avatar,
                    slug: currentUserInfo.slug,
                    isSeen: 0,
                    createdAt: new Date().toISOString(),
                })
            );
        }
    };
}

function appendMessageList(msg) {
    return (dispatch, getState) => {
        const appState = getState();
        const { messageList } = appState.message;
        const newMessageList = produce(messageList, (draft) => {
            const existMsgIdx = draft.findIndex(
                (_msg) =>
                    (_msg.idUserFrom === msg.idUserFrom && _msg.idUserTo === msg.idUserTo) ||
                    (_msg.idUserFrom === msg.idUserTo && _msg.idUserTo === msg.idUserFrom)
            );
            if (existMsgIdx >= 0) {
                draft.splice(existMsgIdx, 1);
            }
            draft.unshift(msg);
        });
        dispatch(setMessageList(newMessageList));
    };
}

export { getAllByUserSlug, getLatestMessages, getUserBasicInfoBySlug, sendMessage, appendMessage };

export default messageSlice.reducer;
