import { Sequelize } from "sequelize";

const db = new Sequelize("notes-198", "root", "",{
    host: "localhost",
    dialect: "mysql",
});

export default db