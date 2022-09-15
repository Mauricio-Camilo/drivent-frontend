import api from './api';

export async function getEventDays() {
  const response = await api.get('/activities');
  return response.data;
}

export async function getActivitiesByDayId(id) {
  const response = await api.get(`/activities/${id}`);
  return response.data[0].auditoriums;
}

export async function updateLectureVacancies(data) {
  const queryStatus = await api.put('/activities', data);
  return queryStatus.data;
}

