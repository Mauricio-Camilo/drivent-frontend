import api from './api';

export async function saveReservation(data) {
  console.log(data);
  await api.post('reservations', data);
}
