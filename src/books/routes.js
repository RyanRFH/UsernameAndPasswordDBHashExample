const { Router } = require("express")

const bookRouter = Router()

const { addBook} = require ("./controllers")

bookRouter.post("/books/addBook", addBook)


module.exports = bookRouter