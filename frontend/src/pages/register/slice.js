import { createSlice } from "@reduxjs/toolkit";

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
            isFocusingPassword: false,
            isFocusingEmail: false,
            passwordStrength: 0,
        },
    },
    reducers: {
        updateRegisterInfo: (state, action) => {
            state.registerInfo = action.payload;
        },
        updateRegisterInfoValidation: (state, action) => {
            state.registerInfoValidation = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateRegisterInfo, updateRegisterInfoValidation } = registerSlice.actions;

export default registerSlice.reducer;
