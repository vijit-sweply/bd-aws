import apiService from '..';

const createDonorAction = data => apiService.post('donor/register', data);

const getDonorAction = id => apiService.get(`donor/${id}`);

const updateDonorAction = data => apiService.put('donor', data);

export { createDonorAction, updateDonorAction, getDonorAction };
