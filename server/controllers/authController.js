const Users = require("../models/users")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const registerUser = async (req, res, next) => {

    const { first_name, last_name, email, password } = req.body

    if(!first_name || !last_name || !email || !password)
        return res.status(400).json({status: false})

}

module.exports = {
    registerUser,
}
const user = await Users.create({
    first_name: 'test',
    last_name: '1',
    email: 'example@g.c',
    password: 'password'
})