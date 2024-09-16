import { configureStore } from '@reduxjs/toolkit'
import userReducers, { resetUser } from './userSlice'
import projectReducers, { resetProject } from './projectSlice'

const store = configureStore({
  reducer: {
    user : userReducers,
    project : projectReducers
  }
})

export const resetData = () => {
  store.dispatch(resetUser())
  store.dispatch(resetProject())
}

export default store