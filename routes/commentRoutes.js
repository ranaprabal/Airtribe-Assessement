const express = require("express")
const authenticate = require("../middlewares/authenticate")
const { isInstructor } = require("../middlewares/authorize")

const router = express.Router()

const { createComment } = require("../controllers/comments")

router.post("/create", authenticate, isInstructor, createComment)

module.exports = router
