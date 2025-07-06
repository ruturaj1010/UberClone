const userModel = require("../models/userModel");

module.exports.createUser = async({ firstname, lastname, email, password }) => {
    if ( !firstname || !email || !password) {
        throw new Error("All fields are required");
    }

    const newUser = new userModel ({
        fullname : {
            firstname,
            lastname 
        },
        email,
        password
    })

    return await newUser.save()
}