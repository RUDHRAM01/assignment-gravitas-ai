const Sequelize = require('sequelize');
const dbConfig = require('./config');
require('dotenv').config();

const sequelize = new Sequelize(process.env.NODE_ENV === "development" ? dbConfig.development : dbConfig.production);

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync().then(() => {
            console.log('Database synced');
        });
        
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = {sequelize,connectToDatabase};