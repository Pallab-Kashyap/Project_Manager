import jwt from 'jsonwebtoken'
import { TokenPayload } from '../controllers/memberController';


const generateToken = (data: {}, expiresIn: string) => {

    const jwtSecret = process.env.JWT_SECRET;

    if(!jwtSecret){
        throw new Error('jwt secter is undefined')
    }

    const token = jwt.sign(data, jwtSecret, { expiresIn })

    return token
}



const verifyToken = (token: string) => {
    
try {
        const jwtSecret = process.env.JWT_SECRET;
    
        if(!jwtSecret){
            throw new Error('jwt secter is undefined')
        }
    
        const verifiedToken = jwt.verify(token, jwtSecret) as TokenPayload

        if(!verifiedToken){
            throw new Error('token is invalid')
        }
    
        return verifiedToken

} catch (error) {
    console.log(error);
    throw new Error('token is invalid')
}
}

export {
    generateToken,
    verifyToken    
} 