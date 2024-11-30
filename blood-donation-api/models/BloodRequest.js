const { DataTypes } = require('sequelize');
const db = require('../configs/db-config');

const BloodRequest = db.define('BloodRequest', {
    bloodType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    requiredUnits: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    patientName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    contactPersonName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contactPhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    // Additional fields for tracking donation status
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    },
    donationDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

module.exports = BloodRequest;