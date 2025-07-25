import { environment } from '@/environments/environment';
import { extractAxiosError } from '@/shared/utils/extractAxiosError';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: environment.baseURL,
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
