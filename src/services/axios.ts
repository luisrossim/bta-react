import { environment } from '@/environments/environment';
import axios from 'axios';


export const axiosInstance = axios.create({
  baseURL: environment.baseURL,
  withCredentials: true
})


// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      //UtilsService.actionsForExpiredToken();
    }

    return Promise.reject(error);
  }
);