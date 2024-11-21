import jwt from 'jsonwebtoken'
import apiResponse from './apiResponse';
import { response } from 'express';
import errorResponse from './apiError';


const generateToken = (data: {}, expiresIn: string) => {

    const jwtSecret = process.env.JWT_SECRET;

    if(!jwtSecret){
        return false
    }

    const token = jwt.sign(data, jwtSecret, { expiresIn })

    return token
}

const verifyToken = (token: string) => {
    
try {
        const jwtSecret = process.env.JWT_SECRET;
    
        if(!jwtSecret){
            return false
        }
    
        const verifiedToken = jwt.verify(token, jwtSecret)
    
        return verifiedToken

} catch (error) {
    console.log(error);
    return false
}
}

export {
    generateToken,
    verifyToken    
} 