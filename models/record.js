const Sequelize = require('sequelize');
const {sequelize} = require('../db/db');
const User = require('./user');

const Record = sequelize.define('record', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Record.belongsTo(User);
User.hasMany(Record);


module.exports = Record;