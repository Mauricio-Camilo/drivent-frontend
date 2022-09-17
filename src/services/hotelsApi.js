import api from './api';
import resort from './../assets/images/Resort.svg';
import palace from './../assets/images/Palace.svg';
import world from './../assets/images/World.svg';

export async function getAllHotels() {
  const response = await api.get('/hotels');
  response.data[0].image = resort;
  response.data[1].image = palace;
  response.data[2].image = world;
  return response.data;
}

export async function getSelectedHotelRooms(hotelName) {
  const response = await api.get(`/hotels/${hotelName}`);
  return response.data;
}

export async function getReservatedHotel(data) {
  const { hotel, room } = data;
  const response = await api.get(`/hotels/${hotel}/${room}`);
  if (response.data.hotel === 'Driven Resort') response.data.image = resort;
  if (response.data.hotel === 'Driven Palace') response.data.image = palace;
  if (response.data.hotel === 'Driven World') response.data.image = world;
  return response.data;
}
