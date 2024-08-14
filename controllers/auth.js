const bcrypt = require("bcryptjs")
const User = require("../models/users")
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    if (!(name && email && password && role)) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      })
    }

    const registeredUser = await User.findOne({ where: { email: email } })

    if (registeredUser) {
      return res.status(400).json({
        success: false,
        message: `user with email: ${email} already exist`,
      })
    }

    let hashedPassword
    try {
      hashedPassword = await bcrypt.hash(password, 10)
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
        error: error.message,
      })
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    })
    user.password = undefined
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user creation failed, please try again later",
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!(email && password)) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      })
    }

    let registeredUser = await User.findOne({ where: { email: email } })

    if (!registeredUser) {
      return res.status(404).json({
        success: false,
        message: `No user exist with email: ${email}`,
      })
    }

    const payload = {
      email: registeredUser.email,
      id: registeredUser.userId,
      role: registeredUser.role,
    }

    if (await bcrypt.compare(password, registeredUser.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "2h",
      })

      registeredUser.token = token
      registeredUser.password = undefined

      const options = {
        expiresIn: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
      }

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        registeredUser,
        message: "user Logged in successfully",
      })
    } else {
      return res.status(401).json({
        success: false,
        message: "password is not correct",
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user login failed, please try again later",
      error: error.message,
    })
  }
}
