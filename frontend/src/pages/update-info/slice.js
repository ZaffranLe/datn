import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { appendTokenInfo } from "../../common/common";
import * as api from "./api";
import { history } from "../history";

export const updateInfoSlice = createSlice({
    name: "updateInfo",
    initialState: {
        isLoading: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setLoading } = updateInfoSlice.actions;

function updateInfo(info) {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const newToken = await api.updateInfo(info);
            appendTokenInfo(newToken);
            toast.success("Cập nhật thông tin thành công.");
            history.push(`/profile`);
        } catch (e) {
            toast.error("Cập nhật thông tin thất bại! Vui lòng thử lại sau.");
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export { updateInfo };

export default updateInfoSlice.reducer;
