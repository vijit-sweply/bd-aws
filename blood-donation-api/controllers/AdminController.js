const { Donor, BloodRequest, AdminUser } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getCanReceiveFrom } = require('../lib/getCanReceiveFrom');

const getAllDonors = async (req, res) => {
    try {
        const donors = await Donor.findAll();
        res.json(donors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCompatibleDonors = async (req, res) => {
    try {
        const { params: { group }, query: { search } } = req;
        const bloodGroups = getCanReceiveFrom(group)
        let donors = await Donor.findAll({ raw: true, where: { bloodType: bloodGroups } });
        if (search) {
            const searchQuery = search?.trim()?.toLowerCase();
            donors = donors.filter((o) =>
                Object.values(o).some((value) =>
                    value?.toString().toLowerCase().includes(searchQuery)
                )
            );
        }
        res.json({ donors, bloodGroups });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllBloodRequests = async (req, res) => {
    try {
        const requests = await BloodRequest.findAll({
            raw: true,
            order: [
                ['id', 'DESC'],
            ],
        });
        res.json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const adminLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await AdminUser.findOne({ raw: true, where: { username } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, 'vampire');
    res.json({ token });
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'vampire', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.userId = decoded.userId;
        next();
    });
};

const registerAdmin = async (req, res) => {
    try {
        // Extract username and password from request body
        const { username, password } = req.body;
        // Validate input data
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Check if the username already exists
        const existingUser = await AdminUser.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new admin user record in the database
        const newUser = await AdminUser.create({ username, password: hashedPassword });

        // Return a success response
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateBloodRequest = async (req, res) => {
    try {
        const { bloodType, requiredUnits, patientName, city, contactPersonName, contactPhoneNumber, contactEmail, address, id, DonorId, status } = req.body;
        const data = {
            bloodType,
            status,
            requiredUnits,
            patientName,
            city,
            contactPersonName,
            contactPhoneNumber,
            contactEmail,
            address,
            DonorId
        }

        if (DonorId && status === 'completed') {
            await Donor.update({ lastDonationDate: new Date() }, { where: { id: DonorId } });
        }
        const newRequest = await BloodRequest.update(data, { where: { id } });
        res.json(newRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAllDonors, getAllBloodRequests, adminLogin, verifyToken, registerAdmin, updateBloodRequest, getCompatibleDonors }