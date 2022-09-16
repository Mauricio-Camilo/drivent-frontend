import api from './api';

export async function saveReservation(data) {
  const { ticketId, cardId } = data;
  await api.post(`reservations/${cardId}/${ticketId}`);
}
