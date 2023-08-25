require("dotenv").config()
const express = require("express")
const cors = require("cors")

const userRouter = require ("./users/routes")
const User = require("./users/model")


const bookRouter = require ("./books/routes")
const Book = require("./books/model")

const port = process.env.PORT || 5002

const app = express()

app.use(cors())

app.use(express.json())

app.use(userRouter)
app.use(bookRouter)

const syncTables = () => {

    User.hasMany(Book)
    Book.belongsTo(User)


    User.sync({alter: true})
    Book.sync({alter: true})
}


app.get("/health", (req, res) => {
    res.status(200).json({message: "API is working"})
}
)

app.listen(port, () => {
    syncTables()
    console.log(`Server is running on port ${port}`)
})

