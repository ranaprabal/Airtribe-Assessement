const jwt = require("jsonwebtoken")
require("dotenv").config()

const authenticate = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    })
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      })
    }

    req.user = decoded
    next()
  })
}

module.exports = authenticate
