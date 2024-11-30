const { Sequelize } = require("sequelize");
require('dotenv').config()

const db = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
});

db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


(async () => {
    await db.sync();
    console.log('All models were synchronized successfully.');
})();

module.exports = db;