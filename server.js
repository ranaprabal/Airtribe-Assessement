require("dotenv").config()
const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const { testDbConnection, sq } = require("./config/database")
testDbConnection()

require("./models/associations")

sq.sync({ force: false })
  .then(() => {
    console.log("Database & tables created!")
  })
  .catch((err) => {
    console.error("Error creating database & tables", err)
  })

const port = process.env.PORT || 3000

const authRoutes = require("./routes/authRoutes")
const courseRoutes = require("./routes/courseRoutes")
const leadRoutes = require("./routes/leadRoutes")
const commentRoutes = require("./routes/commentRoutes")

app.use("/api/auth", authRoutes)
app.use("/api/course", courseRoutes)
app.use("/api/lead", leadRoutes)
app.use("/api/comment", commentRoutes)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
