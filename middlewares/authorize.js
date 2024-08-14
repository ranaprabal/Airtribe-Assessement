const jwt = require("jsonwebtoken")
require("dotenv").config()

const isInstructor = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if (decoded.role === "instructor") {
      next()
    } else {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      })
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    })
  }
}

const isLearner = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if (decoded.role === "learner") {
      next()
    } else {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      })
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    })
  }
}

module.exports = { isLearner, isInstructor }
