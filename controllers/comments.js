const Comment = require("../models/comments")

exports.createComment = async (req, res) => {
  try {
    const { leadId, instructorId, commentBody } = req.body

    if (!(leadId && instructorId && commentBody)) {
      return res.status(400).json({
        success: false,
        message: "Fill all the required fields",
      })
    }

    const createdComment = await Comment.create({
      leadId,
      instructorId,
      commentBody,
    })

    return res.status(200).json({
      success: true,
      message: "comment created successfully",
      data: createdComment,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating comment",
      error: error.message,
    })
  }
}
