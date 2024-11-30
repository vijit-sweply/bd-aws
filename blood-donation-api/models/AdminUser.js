const { DataTypes } = require('sequelize');
const db = require('../configs/db-config');

const AdminUser = db.define('AdminUser', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = AdminUser;