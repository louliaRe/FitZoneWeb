import axios from 'axios';
import { useAuth } from '../AuthContext';

const useAxios = () => {
    const { authState, refreshAccessToken } = useAuth();

    const instance = axios.create({
        baseURL: 'http://127.0.0.1:8000',
        headers: {
            Authorization: `Bearer ${authState.accessToken}`
        }
    });

    instance.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                await refreshAccessToken();
                originalRequest.headers['Authorization'] = `Bearer ${authState.accessToken}`;
                return axios(originalRequest);
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

export default useAxios;
