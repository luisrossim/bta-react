import { extractAxiosError } from '@/shared/utils/extractAxiosError';
import axios from 'axios';

const baseURL = import.meta.env.API_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = extractAxiosError(error);
    return Promise.reject(normalizedError);
  }
);

export { axiosInstance };
