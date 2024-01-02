import axios, { AxiosRequestConfig } from 'axios';

import { paths } from 'src/routes/paths';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
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
  bucket: {
    public: '/bucket/public',
    private: '/bucket/private',
  },
  auth: {
    login: '/v1/user/login',
    logout: '/v1/user/logout',
    register: '/v1/user/register',
    refresh: '/v1/token/refresh',
  },
  profile: {
    root: '/v1/user',
    changePassword: '/v1/user/change-password',
  },
  sow: '/v1/works-scope',
  service: '/v1/service',
  team: '/v1/user/our-team',
  gallery: {
    category: '/v1/gallery/category',
    item: '/v1/gallery',
  },
  product: '/v1/product',
  message: '/v1/messages',
  company: {
    profile: '/v1/company-profile',
    summary: '/v1/company-profile/summary',
    banner: '/v1/banner',
    client: '/v1/our-client',
    logActivity: '/v1/user/log-activity',
  },
};
