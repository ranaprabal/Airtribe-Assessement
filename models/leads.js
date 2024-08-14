const { DataTypes } = require("sequelize")
const { sq } = require("../database/database.js")

const Lead = sq.define(
  "Lead",
  {
    leadId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Course",
        key: "courseId",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    learnerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "User",
        key: "userId",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    appliedOn: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    applicationText: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    linkedinUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    status: {
      type: DataTypes.ENUM("Accepted", "Rejected", "Waitlisted", "Pending"),
      defaultValue: "Pending",
      allowNull: false,
    },
  },
  {
    tableName: "leads",
    timestamps: true,
  }
)

module.exports = Lead
