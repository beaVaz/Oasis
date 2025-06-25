
import axios from 'axios';

const API_URL = "http://localhost:3000/api/auth/signin"; 

export async function loginUser({ email, password }) {
  try {
    const response = await axios.post(API_URL, {
      email,
      password,
    });

    console.log('Resposta completa da API de login:', JSON.stringify(response.data, null, 2)); // Adicione esta linha
    return response.data;
  } catch (error) {
    console.error("Erro no login - Resposta completa do erro:", JSON.stringify(error.response?.data, null, 2)); // Log mais detalhado do erro
    console.error("Erro no login - Mensagem:", error.message);
    throw error;
  }
}
