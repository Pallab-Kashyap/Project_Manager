const Users = require("../models/users");
const asyncWrapper = require("../utils/asyncWrapper");

const findUser =  async(email) => {
    const user = await Users.findOne({
        where: {
            email: email
        }
    })
    return user;
}

module.exports = {
    findUser
}