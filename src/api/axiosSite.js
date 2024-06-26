import axios from "axios";

const instance = axios.create({
    // baseURL: process.env.REACT_APP_POSTMAN,
    baseURL: process.env.REACT_APP_VIETSAC,
    timeout: 3000,
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