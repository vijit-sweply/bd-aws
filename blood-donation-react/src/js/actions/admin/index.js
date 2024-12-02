import apiService from '..';

const getBloodRequestsAction = () => apiService.get('admin/requests');

const getDonorsAction = () => apiService.get('admin/donors');

export { getBloodRequestsAction, getDonorsAction };
