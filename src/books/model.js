const { DataTypes } = require("sequelize")
const connection = require("../db/connection")

const Book = connection.define("Book", {

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre : {
        type: DataTypes.STRING
    },
    releaseDate : {
        type: DataTypes.STRING
    },
    UserId : {
        type: DataTypes.INTEGER
    }
}

)

module.exports = Book
  