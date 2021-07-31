import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../pages/login/slice";
import registerReducer from "../pages/register/slice";
import updateInfoReducer from "../pages/update-info/slice";
import profileReducer from "../pages/profile/slice";
import genderReducer from "../pages/gender/slice";
import hobbyReducer from "../pages/hobby/slice";
import preferenceReducer from "../pages/preference/slice";
import provinceReducer from "../pages/province/slice";
import exploreReducer from "../pages/explore/slice";
import searchReducer from "../pages/search/slice";
import messageReducer from "../pages/message/slice";
import imageModalReducer from "../components/album/image-modal/slice";

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
        imageModal: imageModalReducer,
        explore: exploreReducer,
        message: messageReducer,
        search: searchReducer,
    },
});
