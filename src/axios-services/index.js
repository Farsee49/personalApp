import axios from 'axios';

export async function getApiHealth() {
  const url = "http://localhost:3000/api/health";
  try {
    const response = await axios.get(url);
    console.log('API health', response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
}