const express = require('express');
const router = express.Router();
const { createBloodRequest, getDashboardData, getRequest, sendOTP, verifyOTP } = require('./controllers/BloodRequestController');
const { registerDonor, getDonor, updateDonor } = require('./controllers/DonorController');
const {
    getAllDonors,
    getAllBloodRequests,
    adminLogin,
    verifyToken,
    registerAdmin,
    getCompatibleDonors,
    updateBloodRequest
} = require('./controllers/AdminController');

// Donor
router.post('/donor/register', registerDonor);
router.get('/donor/:id', verifyToken, getDonor);
router.put('/donor', verifyToken, updateDonor);

// Blood Requests
router.post('/bloodrequest', createBloodRequest);
router.get('/request/:id', verifyToken, getRequest);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

// Admin
router.post('/login', adminLogin);
router.post('/register/api', registerAdmin);
router.get('/admin/donors', verifyToken, getAllDonors);
router.get('/admin/requests', verifyToken, getAllBloodRequests);
router.get('/admin/compatible/:group', verifyToken, getCompatibleDonors);
router.put('/bloodrequest', verifyToken, updateBloodRequest);

// Dashboard
router.get('/dashboard', getDashboardData);


// Dashboard
router.get('/dashboard', getDashboardData);



module.exports = router;