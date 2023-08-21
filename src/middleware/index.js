const User = require ("../users/model")

const bcrypt = require ("bcrypt")

const saltRounds = process.env.SALT_ROUNDS

const hashPass = async (req, res, next) => {

    try {

        req.body.password = await bcrypt.hash(req.body.password, parseInt(saltRounds))
        console.log("Hashed password = ", req.body.password)

        next()
        
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error:error})
        
    }

}

const comparePass = async (req, res, next) => {

    try {
        let user = await User.findOne({where: {username: req.body.username}})

        if (user == null) {
            throw new Error("Usernames not found")
        }

        let match = await bcrypt.compare(req.body.password, user.password)
        console.log("Do the passwords match = ", match)


        if (match === false) {
            throw new Error("Paswords do not match")
        }

        next()

        
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error:error})
        
    }

}

module.exports = {
    hashPass,
    comparePass
}