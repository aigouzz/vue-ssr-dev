import axios from 'axios';
import {baseURL} from './base';

let axiosInstance = axios.create({
    baseURL,
    timeout: 4000,
    headers: {
        "withCredentials": true,
        "content-type": "application/json;charset=utf-8"
    } 
});

axiosInstance.interceptors.request.use((config) => {

});

axiosInstance.interceptors.response.use((response) => {
    const data = response.data;
    return data;
}, (error) => {
    console.error(`请求错误，报错信息：${error}`);
    return Promise.reject(error);
});

export default axiosInstance;