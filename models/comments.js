const { DataTypes } = require("sequelize")
const { sq } = require("../database/database.js")

const Comment = sq.define(
  "Comment",
  {
    commentId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    leadId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Lead",
        key: "leadId",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    instructorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "User",
        key: "userId",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    commentBody: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    commentedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "comments",
    timestamps: true,
  }
)

module.exports = Comment
