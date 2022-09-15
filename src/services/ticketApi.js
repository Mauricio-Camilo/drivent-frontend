import api from './api';

export async function insertTicket(body, token) {
  const response = await api.post('/ticket', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
