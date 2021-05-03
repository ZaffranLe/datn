import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./login/slice";
import registerReducer from "./register/slice";
import updateInfoReducer from "./update-info/slice";
import profileReducer from "./profile/slice";
import genderReducer from "./gender/slice";
import hobbyReducer from "./hobby/slice";
import preferenceReducer from "./preference/slice";
import provinceReducer from "./province/slice";

export default configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer,
        updateInfo: updateInfoReducer,
        profile: profileReducer,
        gender: genderReducer,
        hobby: hobbyReducer,
        preference: preferenceReducer,
        province: provinceReducer,
    },
});
