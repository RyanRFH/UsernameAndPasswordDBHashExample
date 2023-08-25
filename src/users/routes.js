const { Router } = require("express")
const { hashPass, comparePass, tokenCheck} = require ("../middleware")

const userRouter = Router()

const { registerUser, getAllUsers, login, deleteUser, getUserAndBooks} = require ("./controllers")

userRouter.post("/users/register", hashPass, registerUser)

userRouter.get("/users/getAllUsers", tokenCheck, getAllUsers)

userRouter.post("/users/login", comparePass , login)

userRouter.get("/users/authCheck", tokenCheck, login) // persistant login

userRouter.delete("/users/deleteUser", tokenCheck, deleteUser)

userRouter.get("/users/getUserAndBooks/:username", getUserAndBooks) // Not sure if working

module.exports = userRouter