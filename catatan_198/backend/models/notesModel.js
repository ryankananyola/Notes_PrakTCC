import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize

const Note = db.define("note", {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
})

db.sync().then(() => console.log("Database Tersinkron"))

export default Note