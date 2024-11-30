const { getCanDonateTo } = require('../lib/getCanDonateTo');
const { Donor, OTP } = require('../models');

const registerDonor = async (req, res) => {
    try {
        const { name, bloodType, email, phone, lastDonationDate, address, city, otp } = req.body;
        if (!name || !bloodType || !email || !phone) {
            return res.status(400).json({ message: 'Enter the required fields' })
        } else {
            const record = await OTP.findOne({ where: { phoneNumber: phone, otp } });
            if (!record) {
                return res.status(403).json({ message: 'Mobile not verified' });
            }
        }
        await OTP.destroy({ where: { phoneNumber: phone } });
        const newDonor = await Donor.create({ name, bloodType, email, phone, lastDonationDate, address, city });
        res.json(newDonor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getDonor = async (req, res) => {
    const { params: { id } } = req
    try {
        const donor = await Donor.findOne({
            raw: true,
            subQuery: false,
            where: { id },
        });
        const bloodTypes = getCanDonateTo(donor.bloodType)
        res.json({ donor, bloodTypes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateDonor = async (req, res) => {
    try {
        const { id, city, name, bloodType, email, phone, lastDonationDate, address } = req.body;
        const data = {
            bloodType,
            name,
            email,
            phone,
            lastDonationDate,
            address,
            city
        }
        const newRequest = await Donor.update(data, { where: { id } });
        res.json(newRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { registerDonor, getDonor, updateDonor }