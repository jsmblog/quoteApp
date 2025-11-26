import { connection_to_backend } from "../connection/connection";

// Registrar usuario normal
export const registerUser = async (userData) => {
  try {
    const response = await connection_to_backend.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Crear usuario anónimo
export const createAnonymousUser = async () => {
  try {
    const response = await connection_to_backend.post('/anonymous',{});
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Login
export const loginUser = async (credentials) => {
  try {
    const response = await connection_to_backend.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Obtener todos los usuarios
export const getAllUsers = async () => {
  try {
    const response = await connection_to_backend.get('/user');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Obtener un usuario
export const getUser = async (id) => {
  try {
    const response = await connection_to_backend.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};