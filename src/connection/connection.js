import axios from 'axios';
const API_BASE_URL = 'http://localhost:3000/api';

export const connection_to_backend = axios.create({
  baseURL: API_BASE_URL,
});