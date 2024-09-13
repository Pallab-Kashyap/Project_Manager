import axios from "../utils/axios";

const createProject = async (data) => {
    
    try{
    const result = await axios.post('/project', data)


    if(result){
        console.log(result);
        return result.data
    }

    return null
}catch(err){
    console.log(err);
    return null
}
}

const getAllProjects = async () => {
    const result = await axios.get('/project')
    return result.data.result
}

export {
    createProject,
    getAllProjects,
}