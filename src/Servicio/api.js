import axios from "axios";

const URL_BASE = 'http://localhost:3001/api/'
const API = axios.create(
    {
        baseURL : URL_BASE,
    }
);
export default API;
