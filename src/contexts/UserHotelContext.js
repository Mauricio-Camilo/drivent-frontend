import { useState } from 'react';
import { createContext } from 'react';

const UserHotelContext = createContext();

function UserHotelProvider({ children }) {
  const [hotels, setHotels] = useState();
  const [selectedHotel, setSelectedHotel] = useState(new Map());

  return (
    <UserHotelContext.Provider value={{ hotels, setHotels,
      selectedHotel, setSelectedHotel }}>
      {children}
    </UserHotelContext.Provider>
  );
}

export { UserHotelContext, UserHotelProvider };
