import Axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import type { LoginResponse } from '../types'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const HEADER_AUTH = "Authorization"
const getToken = () => {return localStorage.getItem('token')}
const header = () => ({
  headers: { [HEADER_AUTH]: `Bearer ${getToken()}` }
});

const axiosInstance = Axios.create({
    baseURL: API_BASE_URL,
    timeout: 2000,
  });

const get = (url: string, header?: AxiosRequestConfig<any> | undefined) => 
    axiosInstance.get(url, header)

const post = (url: string, body?: any, header?: AxiosRequestConfig<any> | undefined) => 
    axiosInstance.post(url, body, header)
        
// const del = (url: string, header?: AxiosRequestConfig<any> | undefined) => 
//     axiosInstance.delete(url, header)

const login = async (body: { username: string; password: string }): Promise<AxiosResponse<LoginResponse>> => {
    return post(`${API_BASE_URL}login`, body);
};

const register = async (body: {
    name: string;
    username: string;
    password: string;
    role: string;
}) => {
    return post(`${API_BASE_URL}register`, body);
};

const getAdmin = () => {
    return get(`${API_BASE_URL}admin`,header())
}

const getUser = () => {
    return get(`${API_BASE_URL}user`,header())
}


const Api = {
    login,
    register,
    getAdmin,
    getUser
}

export default Api