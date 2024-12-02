import apiService from '..';

const loginAction = data => apiService.post('login', data);
const authAction = () => apiService.get('auth');

const registerAction = userData => apiService.post('user/register', userData);

const getDashboardDataAction = () => apiService.get('dashboard');

export { loginAction, registerAction, authAction, getDashboardDataAction };
