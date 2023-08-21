const { Router } = require("express")
const { hashPass, comparePass } = require ("../middleware")

const userRouter = Router()

const { registerUser, getAllUsers, login } = require ("./controllers")

userRouter.post("/users/register", hashPass, registerUser)

userRouter.get("/users/getAllUsers",  getAllUsers)

userRouter.post("/users/login", comparePass , login)

module.exports = userRouter