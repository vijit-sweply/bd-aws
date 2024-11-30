import apiService from '..';

const sendOTPAction = data => apiService.post('send-otp', data);

const verifyOTPAction = data => apiService.post('verify-otp', data);

export { sendOTPAction, verifyOTPAction };
