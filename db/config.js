
require('dotenv').config(); 
const config = {
    development: {
        username: process.env.name_user,
        password: process.env.password,
        database: process.env.database,
        host: process.env.host,
        dialect: process.env.dialect
    },
    production: {
        username: process.env.USER_NAME_p,
        password: process.env.PASSWORD_p,
        database: process.env.DATABASE_p,
        host: process.env.HOST_p,
        dialect: process.env.DIALECT_p
    }
};

module.exports = config;