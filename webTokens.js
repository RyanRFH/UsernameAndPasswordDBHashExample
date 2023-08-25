const jwt  = require("jsonwebtoken")
require("dotenv").config()

const generateAndSignJWT = () => {
    const userId = 123
    const admin = true

    const token = jwt.sign({id: userId, isAdmin: admin}, process.env.SECRET)
    console.log(token)
}

generateAndSignJWT()

//Example token
let generatedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2OTI3MTY1NzB9.9LgyTAnCJI-RD0mQ_qZcjzCVRFVkpBiHHXp4MD6Tx9I" 
let otherToken = "random string"

const verifyToken = () => {
    try {
        const decodedToken = jwt.verify(generatedToken, process.env.SECRET)
        console.log(decodedToken)
        console.log("Vaild Token")
    } catch {
        console.log("Invalid Token")
    }
}

verifyToken()