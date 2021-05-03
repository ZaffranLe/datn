import { createSlice } from "@reduxjs/toolkit";
import * as api from "./api";
import { history } from "../history";

export const registerSlice = createSlice({
    name: "register",
    initialState: {
        registerInfo: {
            email: "",
            password: "",
            confirmPassword: "",
            agreeTerm: false,
        },
        registerInfoValidation: {
            isPasswordMatched: true,
            isEmailValid: true,
            isValid: false,
            passwordStrength: {
                value: 0,
                isLengthPassed: false,
                isSpecialCharIncluded: false,
                isUpperCaseIncluded: false,
                isNumberIncluded: false,
            },
        },
        isLoading: false,
        errorMsg: null,
    },
    reducers: {
        updateRegisterInfo: (state, action) => {
            state.registerInfo = action.payload;
        },
        updateRegisterInfoValidation: (state, action) => {
            state.registerInfoValidation = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setErrorMsg: (state, action) => {
            state.errorMsg = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateRegisterInfo, updateRegisterInfoValidation, setLoading, setErrorMsg } = registerSlice.actions;

let removeErrorMsgTimeoutId = null;

function register(email, password) {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const { token, refreshToken } = await api.register(email, password);
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
            history.push("/update-info");
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

export { register };

export default registerSlice.reducer;
