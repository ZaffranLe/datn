import { configureStore } from '@reduxjs/toolkit'
import registerReducer from './register/slice'

export default configureStore({
  reducer: {
      register: registerReducer
  }
})