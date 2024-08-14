const Course = require("../models/courses")
const User = require("../models/users")

exports.createCourse = async (req, res) => {
  try {
    const { title, description, instructorId, maxSeats, startDate, endDate } =
      req.body

    // const startDate = new Date(Date.parse(startDateString))
    // const endDate = new Date(Date.parse(endDateString))

    if (
      !(
        title &&
        description &&
        instructorId &&
        maxSeats &&
        startDate &&
        endDate
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      })
    }

    const instructor = await User.findByPk(instructorId)

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor does not exist",
      })
    }

    const course = await Course.create({
      title,
      description,
      instructorId,
      maxSeats,
      startDate,
      endDate,
    })
    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "course creation failed, please try again later",
      error: error.message,
    })
  }
}

exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id
    const { title, description, instructorId, maxSeats, startDate, endDate } =
      req.body

    const course = await Course.findByPk(courseId)

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    if (course.instructorId !== instructorId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this course",
      })
    }

    const updatedCourse = await course.update({
      title,
      description,
      instructorId,
      maxSeats,
      startDate,
      endDate,
    })

    return res.status(200).json({
      success: true,
      message: "Course has been updated Successfully",
      data: updatedCourse,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "course updation failed",
      error: error.message,
    })
  }
}

exports.getCourse = async (req, res) => {
  try {
    const courseId = req.params.id

    const course = await Course.findByPk(courseId)

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    return res.status(200).json({
      success: true,
      message: "course has been fetched Successfully",
      data: course,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "can not fetch the course",
      error: error.message,
    })
  }
}

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll()

    return res.status(200).json({
      success: true,
      message: "All courses fetched Successfully",
      data: courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "can not fetch the courses",
      error: error.message,
    })
  }
}
