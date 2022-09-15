import api from './api';

export async function createCard(data) {
  const response = await api.post('/cards', data);
  return response.data;
}
//
