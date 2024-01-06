import axios, { AxiosRequestConfig } from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API, withCredentials: true });

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axiosInstance.post(endpoints.auth.refresh);

        localStorage.setItem('accessToken', response.data.accessToken);

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

        return await axiosInstance(originalRequest);
      } catch (e) {
        console.error(e);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('@ud');
      }
    }
    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    login: '/login',
    logout: '/logout',
    register: '/register',
    refresh: '/token',
    getUser: '/users',
  },
};
