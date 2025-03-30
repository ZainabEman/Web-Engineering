import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/refresh-token`,
          { refreshToken }
        );
        const { token } = response.data;
        localStorage.setItem('token', token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (err) {
        // Handle refresh token failure (e.g., logout user)
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    // Handle other errors
    if (error.response?.data?.error) {
      return Promise.reject(new Error(error.response.data.error));
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
  resetPassword: (token, password) =>
    api.post(`/auth/reset-password/${token}`, { password }),
};

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  uploadAvatar: (formData) =>
    api.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export const tutorAPI = {
  search: (params) => api.get('/tutors/search', { params }),
  getDetails: (id) => api.get(`/tutors/${id}`),
  submitVerification: (data) => api.post('/tutors/verification', data),
  updateAvailability: (availability) =>
    api.put('/tutors/availability', availability),
};

export const sessionAPI = {
  create: (data) => api.post('/sessions', data),
  getList: (params) => api.get('/sessions', { params }),
  getDetails: (id) => api.get(`/sessions/${id}`),
  updateStatus: (id, status) => api.put(`/sessions/${id}/status`, { status }),
  addReview: (id, review) => api.post(`/sessions/${id}/review`, review),
};

export default api; 