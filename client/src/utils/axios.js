import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_API_URL;

console.log(baseURL);

const axiosInstance = axios.create({
  baseURL, 
  withCredentials: true, 
});

axios.defaults.headers.common['Content-Type'] = 'application/json';


// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken'); 
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {

//     if (error.response && error.response.status === 401) {
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
export default axiosInstance
