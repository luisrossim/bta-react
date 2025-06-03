import { environment } from '@/utils/environments/environment';
import { UtilsService } from '@/utils/services/utils-service';
import axios from 'axios';


export const axiosInstance = axios.create({
  baseURL: environment.baseURL
})


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      UtilsService.actionsForExpiredToken();
    }

    return Promise.reject(error);
  }
);