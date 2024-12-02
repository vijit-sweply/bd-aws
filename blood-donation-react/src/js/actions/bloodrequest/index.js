import apiService from '..';

const requestBloodAction = data => apiService.post('bloodrequest', data);

const updateRequestAction = data => apiService.put('bloodrequest', data);

const getRequestAction = id => apiService.get(`request/${id}`);

const getGroupDonorsAction = (group, search) => apiService.get(`admin/compatible/${group}?search=${search}`);

export { requestBloodAction, updateRequestAction, getRequestAction, getGroupDonorsAction };
