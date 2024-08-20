require("dotenv").config()
const { Sequelize } = require("sequelize")

const sq = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  "31082001",
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
  }
)

const testDbConnection = async () => {
  try {
    const connectionUrl = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`
    console.log(connectionUrl)
    await sq.authenticate()
    console.log("DB Connection has been established successfully.")
  } catch (error) {
    console.error("Unable to connect to the DB", error)
  }
}

module.exports = { sq, testDbConnection }
