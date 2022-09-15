import { useState } from 'react';
import { createContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const UserHotelContext = createContext();

function UserHotelProvider({ children }) {
  const [userHotel, setUserHotel] = useLocalStorage('userHotel', undefined);
  const [lastRoomSelected, setLastRoomSelected] = useState(localStorage.getItem('room'));
  const [hotelInDb, setHotelInDb] = useState({ boolean: false, response: null });
  const [auxHotelInDb, setAuxHotelInDb] = useState({ image: '', peoplesInYourRoom: '' });

  return (
    <UserHotelContext.Provider value={{ userHotel, setUserHotel, lastRoomSelected, setLastRoomSelected, hotelInDb, setHotelInDb, auxHotelInDb, setAuxHotelInDb }}>
      {children}
    </UserHotelContext.Provider>
  );
}

export { UserHotelContext, UserHotelProvider };
