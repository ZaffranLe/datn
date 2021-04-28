import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './login/slice'
import registerReducer from './register/slice'
import profileReducer from './profile/slice'

export default configureStore({
  reducer: {
      login: loginReducer,
      register: registerReducer,
      profile: profileReducer
  }
})