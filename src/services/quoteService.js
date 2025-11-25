import { connection_to_backend } from "../connection/connection";

// Obtener todas las citas
export const getAllQuotes = async () => {
  try {
    const response = await connection_to_backend.get('/quotes');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Obtener citas de un usuario específico
export const getQuotesByUser = async (userId) => {
  try {
    const response = await connection_to_backend.get(`/quotes/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Obtener una cita aleatoria
export const getRandomQuote = async () => {
  try {
    const response = await connection_to_backend.get('/quote/random');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Crear una nueva cita
export const createQuote = async (quoteData) => {
  try {
    const response = await connection_to_backend.post('/quotes', quoteData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Actualizar una cita
export const updateQuote = async (id, text) => {
  try {
    const response = await connection_to_backend.put(`/quotes/${id}`, { text });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Eliminar una cita
export const deleteQuote = async (id) => {
  try {
    const response = await connection_to_backend.delete(`/quotes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};