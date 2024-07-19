import axios from "axios";

const instance = axios.create({
    // baseURL: process.env.REACT_APP_POSTMAN,
    baseURL: process.env.REACT_APP_VIETSAC,
    timeout: 3000,
});

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.log(error);
    }
)

export default instance;