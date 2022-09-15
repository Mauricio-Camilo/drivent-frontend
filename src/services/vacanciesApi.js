import api from './api';

export async function updateRoomVacancy(userId, vacancyId, data) {
  await api.put(`/hotels/${userId}/${vacancyId}`, data);
}

export async function getVacanciesInRoom(vacancyId) {
  const response = await api.get(`/hotels/vacancies/${vacancyId}`);
  return response.data;
}
