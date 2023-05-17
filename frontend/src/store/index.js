import { configureStore } from '@reduxjs/toolkit';
import auth from './authSlice'
import activate from './activationSlice'
export const store = configureStore({
  reducer: {
    auth,
    activate
  },
})


