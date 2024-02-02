
require('dotenv').config(); 
console.log(process.env.NAME);

const config = {
    development: {
        username: process.env.NAME,
        password: process.env.password,
        database: process.env.database,
        host: process.env.host,
        dialect: process.env.dialect
    },
    production: {
        username: '#',
        password: '#',
        database: '#',
        host: '#',
        dialect: '#'
    }
};

module.exports = config;