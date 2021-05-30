import axios from "axios";

const URL_BASE = 'https://api-node-mongo.herokuapp.com/api/'
const API = axios.create(
    {
        baseURL : URL_BASE,
    }
);
export default API;
