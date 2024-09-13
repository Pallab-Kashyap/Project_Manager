import axios from "../utils/axios";

const registerUser = async (data) => {
    
    try{
    const result = await axios.post('/auth/signin', data)


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

const login = async (data) => {
    
    // console.log(data);
    console.log('ent login');
    try{
    const result = await axios.post('/auth/login', data)


    if(result){
        console.log(result);
        return result.data.result
    }

    return null
}catch(err){
    console.log(err);
    return null
}
}

export {
    registerUser,
    login,
}