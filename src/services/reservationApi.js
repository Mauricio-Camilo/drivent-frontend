import api from './api';

export async function saveTicket(data) {
  console.log(data);
  const response = await api.post('reservations', data);
  return response.data;
}

export async function saveReservation(data) {
  const { ticketId, cardId } = data;
  await api.post(`reservations/${cardId}/${ticketId}`);
}
