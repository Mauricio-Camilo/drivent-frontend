import { useState } from 'react';
import { createContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const UserHotelContext = createContext();

function UserHotelProvider({ children }) {
  const [hotels, setHotels] = useState();
  const [roomsData, setRoomsData] = useState();
  const [selectedHotel, setSelectedHotel] = useState(new Map());
  const [selectedRoom, setSelectedRoom] = useState(new Map());
  const [selectedUser, setSelectedUser] = useState(new Map());
  const [lastRoomSelected, setLastRoomSelected] = useState(localStorage.getItem('room'));
  const [lastPage, setLastPage] = useState(localStorage.getItem('lastHotelPage'));
  const [registeredHotel, setRegisteredHotel] = useLocalStorage('registeredHotel', {});
  
  return (
    <UserHotelContext.Provider value={{ hotels, setHotels,
      selectedHotel, setSelectedHotel,
      roomsData, setRoomsData,
      selectedRoom, setSelectedRoom,
      selectedUser, setSelectedUser,
      lastRoomSelected, setLastRoomSelected,
      lastPage, setLastPage }}>
      {children}
    </UserHotelContext.Provider>
  );
}

export { UserHotelContext, UserHotelProvider };
