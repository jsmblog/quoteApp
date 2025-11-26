import axios from 'axios';
const API_BASE_URL = 'http://18.226.165.214/api';
export const connection_to_backend = axios.create({
  baseURL: API_BASE_URL,
});