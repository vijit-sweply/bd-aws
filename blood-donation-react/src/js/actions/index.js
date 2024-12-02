const handleRequest = async (path, method = 'GET', data = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (localStorage.getItem('auth')) {
    headers.Authorization = `Bearer ${localStorage.getItem('auth')}`;
  }

  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }
  const url = `http://13.235.80.201:1337/${path}`;

  return fetch(url, options)
    .then(response => {
      // 1. check response.ok
      if (response.ok) {
        return response.json();
      }
      return response.json().then(error => Promise.reject(error)); // 2. reject instead of throw
    }).catch(error => {
      console.log('Network error:', error);
      return Promise.reject(error);
    });
};

const apiService = {
  get: async path => handleRequest(path, 'GET'),
  post: async (path, data) => handleRequest(path, 'POST', data),
  put: async (path, data) => handleRequest(path, 'PUT', data),
  patch: async (path, data) => handleRequest(path, 'PATCH', data),
  delete: async (path, data) => handleRequest(path, 'DELETE', data),
};

export default apiService;
