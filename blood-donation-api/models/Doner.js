const { DataTypes } = require('sequelize');
const db = require('../configs/db-config');

const Donor = db.define('Donor', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bloodType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastDonationDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

module.exports = Donor;