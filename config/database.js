require('dotenv').config()

module.exports = {

    username: process.env.DB_NAME || "tis",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_DATABASE || "tis",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "postgres",

    seederStorage: "sequelize",
    seederStorageTableName: "seeds",

    migrationStorage: "sequelize",
    migrationStorageTableName: "migrations",

}

//need to change to postgres later