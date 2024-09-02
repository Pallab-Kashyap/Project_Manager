import axios from "../utils/axios";

const registerUser = async (data) => {
    
    try{
    const result = await axios.post('/auth/signin', data)


    if(result)
        return result

    return null
}catch(err){
    console.log(err);
    return null
}
}

export default registerUser