import { configureStore } from '@reduxjs/toolkit'
import userReducers from './userSlice'
import projectReducers from './projectSlice'

const store = configureStore({
  reducer: {
    user : userReducers,
    project : projectReducers
  }
})

export default store