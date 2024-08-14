const express = require("express")
const authenticate = require("../middlewares/authenticate")
const { isInstructor, isLearner } = require("../middlewares/authorize")

const router = express.Router()

const {
  createLead,
  updateLeadStatus,
  searchLeads,
  getLead,
  getAllLeadsOfCourse,
} = require("../controllers/leads")

router.post("/create", authenticate, isLearner, createLead)
router.put("/update/:id", authenticate, isInstructor, updateLeadStatus)
router.get("/search", authenticate, isInstructor, searchLeads)
router.get("/:id", authenticate, isInstructor, getLead)
router.get("/all/:id", authenticate, isInstructor, getAllLeadsOfCourse)

module.exports = router
