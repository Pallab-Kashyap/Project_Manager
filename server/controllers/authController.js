const Users = require("../models/userModels/usersModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncWrapper = require("../utils/asyncWrapper")
const resData = require("../utils/apiRes")
const { findUser } = require("./userController")


const registerUser = asyncWrapper(async (req, res, next) => {

    const { first_name, last_name, email, password } = req.body

    if(!first_name || !last_name || !email || !password)
        return res.status(400).json({status: false, message: 'all fields required'})

    let user = await findUser(email);
 

    if(user) return res.status(409).json(resData(false, 'user already exist', null))

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    req.body.password = hashedPassword;


    user = await Users.create(req.body)
    if(!user) return res.status(500).json(resData(false, 'something went wrong', null))

    user = user.toJSON();
    user.password = undefined

    const payload = {
        userId: user.id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 90) // 30 days in the future
      };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

    res.cookie('token', token, {
        httpOnly: true,  // Cookie is accessible only via HTTP(S), not JavaScript
        secure: true,    // Ensures the cookie is sent over HTTPS
      });

    res.status(201).json(resData(true, 'user created successfully', user))

})

const loginUser = asyncWrapper(async (req, res, next) => {

    const { email, password } = req.body
    if(!email || !password)
        return res.status(400).json({status: false, message: 'all fields required'})

    let user = await findUser(email)

    if(!user) return res.status(409).json(resData(false, "user doesn't exists", null))

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) return res.status(401).json(resData(false, "incorrect email or Password", null))

    user.password = undefined

    const payload = {
        userId: user.id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 90) // 30 days in the future
      };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

    res.cookie('token', token, {
        httpOnly: true,  // Cookie is accessible only via HTTP(S), not JavaScript
        secure: true,    // Ensures the cookie is sent over HTTPS
      });

    res.status(201).json(resData(true, 'user created successfully', user))

})

module.exports = {
    registerUser,
    loginUser
}