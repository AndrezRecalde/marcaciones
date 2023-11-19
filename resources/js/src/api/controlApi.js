import axios from "axios";
import { getEnv } from "../helpers/getEnv";

const { VITE_APP_URL } = getEnv();

const controlApi = axios.create({
    baseURL: VITE_APP_URL,
});

controlApi.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        'Authorization' : 'Bearer ' + localStorage.getItem("eth_token"),
        'Accept': "application/json",
    };
    return config;
});

export default controlApi;
