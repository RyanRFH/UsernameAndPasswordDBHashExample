const User = require("./model")
const Book = require("../books/model")
const jwt = require("jsonwebtoken")

//req = request, res = response
const registerUser = async (req, res) => {

    console.log("Next called and now inside controller registerUser")

    //Email validation
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    console.log(req.body.email)
    if (req.body.email.match(validRegex)) {
        console.log("Email format is valid")
    } else 
    {
        console.log("Email format is not valid")
        res.status(501).json({errorMessage:"Email format is not valid"})
        return
    }

    try {
        console.log("Creating user in database")
     const user = await User.create ({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password

     })

        // const user = await User.create(req.body)

        res.status(201).json({
            message: "Successfully registered",
            user: {username: req.body.username, email:req.body.email}
        })
        
    } catch (error) {
        console.log("Error in register user")
        res.status(501).json({errorMessage:error.message, error:error})
        
    }
}

const getAllUsers = async (req, res) => {
    try {

    

      const users = await User.findAll();

      // remove passwords from users object
      for (let user of users) {
        user.password = "";
      }

      res.status(200).json({ message: "success", users: users });
    } catch (error) {
      res.status(501).json({ errorMessage: error.message, error: error });
    }
};

const login = async (req, res) => {
    try {
        //Handles pesistant login
        if (req.authUser) {
            res.status(200).json({
                message: "success",
                user:{
                    username: req.authUser.username,
                    email: req.authUser.email
                }
            })
            return
        }

        //Handles manual login
        const token = jwt.sign({id: req.user.id}, process.env.SECRET)
        res.status(200).json ({
            message: "success",
            user: {
                username: req.body.username,
                email: req.body.email,
                token: token
            }
        })
        
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error:error})
        
    }
}

const deleteUser = async (req, res) => {
    try {
        const deletedUsersAmount = await User.destroy({
            where: {
                id: req.body.id
            }
        })
        res.status(200).json({ message: "success", deletedUser: deletedUsersAmount });
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
    }
};

const getUserAndBooks = async (req,res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.params["username"]
            },
            include: Book
        })
        res.status(201).json({message: "Success", user: user})
    } catch (error){
        console.log(error)
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

module.exports = {
    registerUser,
    getAllUsers,
    login,
    deleteUser,
    getUserAndBooks
}