import { createContext, useContext } from 'react'
import STATUS from '../../utils/enum'

const createProjectContext = createContext({
    status : STATUS.NOT_STARTED,
    setStatus: () => {},
    startDate : new Date(),
    setStartDate : () => {},
    endDate : '',
    setEndDate : () => {},
    members : [],
    setMembers : () => {},
    admin : [],
    setAdmin : () => {},
})

const CreateProjectContextProvider = createProjectContext.Provider

export const useCreateProjectContext = () => {
    return useContext(createProjectContext)
}

export default CreateProjectContextProvider