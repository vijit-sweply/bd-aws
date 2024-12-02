
const { getCanReceiveFrom } = require('../lib/getCanReceiveFrom');
const { BloodRequest, Donor, OTP } = require('../models');
const jwt = require('jsonwebtoken');

const accountSid = 'AC96d075fdbab037ee31716867adb82bc1';
const authToken = '0aa4a8dada0b9eaab0be1099c7446195';
const client = require('twilio')(accountSid, authToken);

const createBloodRequest = async (req, res) => {
    try {
        const { bloodType, requiredUnits, patientName, city, contactPhoneNumber, contactEmail, address, otp } = req.body;
        let contactPersonName = req.body.contactPersonName;
        const authHeader = req.headers['authorization'];
        if (authHeader) {
            const token = authHeader?.split(' ')[1];
            if (token)
                jwt.verify(token, 'vampire', (err, decoded) => {
                    if (err) {
                        return res.status(401).json({ message: 'Invalid token' });
                    }
                    contactPersonName = decoded.username
                });
        } else if (otp) {
            const record = await OTP.findOne({ where: { phoneNumber: contactPhoneNumber, otp } });
            if (!record) {
                return res.status(403).json({ message: 'Mobile not verified' });
            }
        }
        await OTP.destroy({ where: { phoneNumber: contactPhoneNumber } });
        const newRequest = await BloodRequest.create({ bloodType, requiredUnits, patientName, city, contactPersonName, contactPhoneNumber, contactEmail, address });
        res.json(newRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getDashboardData = async (req, res) => {
    try {
        const bloodrequests = await BloodRequest.findAll({
            raw: true,
            subQuery: false,
            where: { status: 'completed' },
        });
        res.json({ totalDonations: bloodrequests?.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getRequest = async (req, res) => {
    const { params: { id } } = req
    try {
        const bloodrequest = await BloodRequest.findOne({
            raw: true,
            subQuery: false,
            where: { id },
        });
        const bloodTypes = getCanReceiveFrom(bloodrequest.bloodType);
        let donors = await Donor.findAll({ raw: true, where: { bloodType: bloodTypes } });
        res.json({ bloodrequest, bloodTypes, donors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const sendOTP = async (req, res) => {
    const { phoneNumber } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("OTP Sent:", otp);
    try {
        await OTP.create({ phoneNumber, otp });
        client.messages
            .create({
                from: 'whatsapp:+14155238886',
                contentSid: 'HX229f5a04fd0510ce1b071852155d3e75',
                contentVariables: `{"1":"${otp}"}`,
                to: `whatsapp:+91${phoneNumber}`
            })
            .then(message => console.log(message.sid))
        return res.json({ status: "Message Sent" });
    } catch (error) {
        console.log(error)
        return res.json({ status: "Message Not Sent" });
    }
}

const verifyOTP = async (req, res) => {
    const { phoneNumber, otp } = req.body;
    try {
        const record = await OTP.findOne({ where: { phoneNumber, otp } });
        if (record) {
            return res.json({ message: "OTP verified successfully" });
        }
        res.status(400).json({ message: 'Invalid OTP' });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}


module.exports = { createBloodRequest, getDashboardData, getRequest, sendOTP, verifyOTP }
