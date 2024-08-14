const Lead = require("../models/leads")
const User = require("../models/users")
const Course = require("../models/courses")
const { Op } = require("sequelize")

exports.createLead = async (req, res) => {
  try {
    const { name, email, courseId, learnerId, applicationText, linkedinUrl } =
      req.body

    if (
      !(
        name &&
        email &&
        courseId &&
        learnerId &&
        applicationText &&
        linkedinUrl
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      })
    }

    const course = await Course.findByPk(courseId)

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "course not found",
      })
    }

    const user = await User.findByPk(learnerId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      })
    }

    const lead = await Lead.create({
      name,
      email,
      courseId,
      learnerId,
      applicationText,
      linkedinUrl,
    })

    return res.status(200).json({
      success: true,
      message: "Application submitted successfully",
      data: lead,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Application submission failed, please try again later",
      error: error.message,
    })
  }
}

exports.updateLeadStatus = async (req, res) => {
  try {
    const leadId = req.params.id
    const { status } = req.body

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Need status to update the application status",
      })
    }

    const lead = await Lead.findByPk(leadId)
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Need lead found with given leadId",
      })
    }

    const course = await Course.findByPk(lead.courseId)
    if (status === "Accepted") {
      if (course.acceptedSeats >= course.maxSeats) {
        return res.status(400).json({
          success: false,
          message: "Max limit reached for the given course",
        })
      }

      await course.update({
        acceptedSeats: course.acceptedSeats + 1,
      })
    }

    await lead.update({ status: status })

    return res.status(200).json({
      success: true,
      message: "lead status updated successfully",
      data: lead,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "lead status updation failed",
      error: error.message,
    })
  }
}

exports.searchLeads = async (req, res) => {
  try {
    const { name, email, courseId } = req.query

    let whereClause = {}
    if (name) {
      whereClause.name = { [Op.like]: `%${name}%` }
    }
    if (email) {
      whereClause.email = { [Op.like]: `%${email}%` }
    }
    whereClause.courseId = courseId

    const leads = await Lead.findAll({
      where: whereClause,
    })

    return res.status(200).json({
      success: true,
      message: "Application with given name and email fetched successfully",
      data: leads,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    })
  }
}

exports.getLead = async (req, res) => {
  try {
    const leadId = req.params.id

    const lead = await Lead.findByPk(leadId)

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      })
    }

    return res.status(200).json({
      success: true,
      message: "Application has been fetched Successfully",
      data: lead,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "can not fetch the application",
      error: error.message,
    })
  }
}

exports.getAllLeadsOfCourse = async (req, res) => {
  try {
    const courseId = req.params.id

    const leads = await Lead.findAll({ where: { courseId: courseId } })

    return res.status(200).json({
      success: true,
      messages: `all : ${leads.length} Applications for given course found successfully`,
      data: leads,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "can not fetch the applications",
      error: error.message,
    })
  }
}
