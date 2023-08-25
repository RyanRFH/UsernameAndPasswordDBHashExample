const Book = require("./model")

const addBook = async (req, res) => {

    try {
        console.log("Creating book in database")

        const book = await Book.create(req.body)

        res.status(201).json({
            message: "Successfully added book",
            book : book
        })
        
    } catch (error) {
        console.log("Error in add book")
        res.status(501).json({errorMessage:error.message, error:error})
        
    }
}




module.exports = {
    addBook
}