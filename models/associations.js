const User = require("./users")
const Course = require("./courses")
const Lead = require("./leads")
const Comment = require("./comments")

User.hasMany(Course, { foreignKey: "instructorId" })
Course.belongsTo(User, { foreignKey: "instructorId" })

Course.hasMany(Lead, { foreignKey: "courseId" })
Lead.belongsTo(Course, { foreignKey: "courseId" })

User.hasMany(Lead, { foreignKey: "learnerId" })
Lead.belongsTo(User, { foreignKey: "learnerId" })

Lead.hasMany(Comment, { foreignKey: "leadId" })
Comment.belongsTo(Lead, { foreignKey: "leadId" })

User.hasMany(Comment, { foreignKey: "instructorId" })
Comment.belongsTo(User, { foreignKey: "instructorId" })

module.exports = { User, Course, Lead, Comment }
