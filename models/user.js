const Sequelize = require("sequelize");
const {sequelize}  = require("../db/db");

const User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAuthenticated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }

});


module.exports = User ;