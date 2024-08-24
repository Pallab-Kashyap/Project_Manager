import { createContext,useContext } from 'react'

const user = createContext({
    user: null,
    setUser: () => {},
})

const UserContextProvider = user.Provider

const useUserContext = () => {
    return useContext(user)
}

export { UserContextProvider, useUserContext};