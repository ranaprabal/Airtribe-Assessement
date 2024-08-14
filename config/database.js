require("dotenv").config()
const { Sequelize } = require("sequelize")

const sq = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
)

const testDbConnection = async () => {
  try {
    await sq.authenticate()
    console.log("DB Connection has been established successfully.")
  } catch (error) {
    console.error("Unable to connect to the DB", error)
  }
}

module.exports = { sq, testDbConnection }
