const User = require ("../users/model")
const jwt = require("jsonwebtoken")
const bcrypt = require ("bcrypt")


//Amount of times to run the hash
const saltRounds = process.env.SALT_ROUNDS

//Turn password into hash
const hashPass = async (req, res, next) => {

    try {

        req.body.password = await bcrypt.hash(req.body.password, parseInt(saltRounds))
        console.log("Hashed password = ", req.body.password)

        next()
        
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error:error})
        
    }

}

//Compare given password to databse hashed password
const comparePass = async (req, res, next) => {

    try {
        req.user = await User.findOne({where: {username: req.body.username}})

        if (req.user == null) {
            throw new Error("Usernames not found")
        }

        let match = await bcrypt.compare(req.body.password, req.user.password)
        console.log("Do the passwords match = ", match)


        if (match === false) {
            throw new Error("Paswords do not match")
        }

        next()

        
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error:error})
        
    }

}

const tokenCheck = async (req, res, next) => {
    try {
        const token = req.header("Authorization")
        console.log("tokenCheck token = ", token)
        
        const decodedToken = jwt.verify(token, process.env.SECRET)

        console.log("decoded token = ", token)

        const user = await User.findOne({where: {id: decodedToken.id}})
        console.log(user)

        if (user === null) {
            throw new Error("User is not authorised")
        }

        req.authUser = user
        next()
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }

}

module.exports = {
    hashPass,
    comparePass,
    tokenCheck
}