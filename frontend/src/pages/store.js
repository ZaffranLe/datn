import { configureStore } from '@reduxjs/toolkit'
import registerReducer from './register/slice'
import profileReducer from './profile/slice'

export default configureStore({
  reducer: {
      register: registerReducer,
      profile: profileReducer
  }
})