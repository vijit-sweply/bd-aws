const { DataTypes } = require('sequelize');
const db = require('../configs/db-config');

const OTP = db.define('OTP', {
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
});

module.exports = OTP;
