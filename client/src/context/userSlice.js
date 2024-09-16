import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoggedIn: false,
    userInfo: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload.userName || state.user
            state.userInfo = action.payload.userInfo || state.userInfo
            state.isLoggedIn = true
        },
        reomveUser: (state, action) => {
            state.user = null
            state.isLoggedIn = false,
            state.userInfo = null
        },
        getUser: (state, action) => {
            return state.user
        },
        resetUser: () => initialState,  
    }
})

export const { addUser,reomveUser,getUser, resetUser } = userSlice.actions

export default userSlice.reducer