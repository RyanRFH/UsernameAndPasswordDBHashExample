require("dotenv").config()
const express = require("express")

const userRouter = require ("./users/routes")
const User = require("./users/model")


const port = process.env.PORT || 5002

const app = express()


app.use(express.json())

app.use(userRouter)  // This line must be AFTER the above line

const syncTables = () => {
    User.sync()
}


app.get("/health", (req, res) => {
    res.status(200).json({message: "API is working"})
}
)

app.listen(port, () => {
    syncTables()
    console.log(`Server is running on port ${port}`)
})

