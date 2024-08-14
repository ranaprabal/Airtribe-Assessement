const express = require("express")
const authenticate = require("../middlewares/authenticate")
const { isInstructor } = require("../middlewares/authorize")

const router = express.Router()

const {
  createCourse,
  updateCourse,
  getAllCourses,
  getCourse,
} = require("../controllers/courses")

router.post("/create", authenticate, isInstructor, createCourse)
router.put("/update/:id", authenticate, isInstructor, updateCourse)
router.get("/all", authenticate, getAllCourses)
router.get("/:id", authenticate, getCourse)

module.exports = router
