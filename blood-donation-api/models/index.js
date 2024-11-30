const Donor = require('./Doner');
const BloodRequest = require('./BloodRequest');
const AdminUser = require('./AdminUser');
const db = require('../configs/db-config');
const OTP = require('./BloodRequest copy');

Donor.hasMany(BloodRequest);
BloodRequest.belongsTo(Donor);

module.exports = {
    db,
    Donor,
    BloodRequest,
    AdminUser,
    OTP
};