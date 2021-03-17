import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
    name: "register",
    initialState: {
        registerInfo: {
            email: "",
            password: "",
            confirmPassword: "",
            passwordMatched: true,
            agreeTerm: false,
        },
    },
    reducers: {
        updateRegisterInfo: (state, action) => {
            state.registerInfo[action.payload.name] = action.payload.value;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateRegisterInfo } = registerSlice.actions;

export default registerSlice.reducer;
