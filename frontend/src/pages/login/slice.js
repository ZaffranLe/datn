import { createSlice } from "@reduxjs/toolkit";
import * as api from "./api";
import { history } from "../history";
export const loginSlice = createSlice({
    name: "login",
    initialState: {
        isLoading: false,
        errorMsg: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setErrorMsg: (state, action) => {
            state.errorMsg = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setLoading, setErrorMsg } = loginSlice.actions;

let removeErrorMsgTimeoutId = null;

function login(email, password) {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const { token, refreshToken } = await api.login(email, password);
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
            history.push("/");
        } catch (e) {
            dispatch(setErrorMsg(e));
            clearTimeout(removeErrorMsgTimeoutId);
            removeErrorMsgTimeoutId = setTimeout(() => {
                dispatch(setErrorMsg(null));
            }, 5000);
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export { login };

export default loginSlice.reducer;
