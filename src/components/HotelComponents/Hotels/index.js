import { useContext, useState, useEffect } from 'react';
import { getSelectedHotelRooms, getAllHotels } from '../../../services/hotelsApi';

import { UserHotelContext } from '../../../contexts/UserHotelContext';
import { toast } from 'react-toastify';

import { HotelsContainer, ImageContainer, Image, RoomsContainer, Room, IconsContainer, Icon, IconStatus, IconFill, Button } from './style';

export function Hotels() {
  const [loadPage, setLoadPage] = useState(false);
  const { hotels, setHotels, selectedHotel, setSelectedHotel } = useContext(UserHotelContext);

  useEffect(() => {
    async function getHotels() {
      setLoadPage(false);
      try {
        const response = await getAllHotels();
        setHotels(response);
        if (response.length !== 0) {
          setLoadPage(true);
        }
      }
      catch {
        toast('Não foi possível renderizar os hotéis!');
        setLoadPage(false);
      }
    } getHotels();
  }, []);

  async function activateHotel(hotel) {
    const alreadySelected = selectedHotel.has(hotel);
    if (alreadySelected) {
      selectedHotel.delete(hotel);
      setSelectedHotel(new Map(selectedHotel));
    }
    else {
      selectedHotel.clear();
      //   selectedRoom.clear();
      //   selectedUser.clear();
      setSelectedHotel(new Map(selectedHotel.set(hotel)));
    //   selectedRoom.clear();
    //   selectedUser.clear();
    }
    // await getAllRooms();
  }

  function handleHospedations() {
    if (loadPage) {
      return (
        <>
          {hotels.map(hotel => {
            const { id, image, name, type, vacancies } = hotel;
            const checkSelectedHotel = selectedHotel.has(name);
            return (
              <ImageContainer key={id} selected={checkSelectedHotel} onClick={() => activateHotel(name)}>
                <Image src={image}></Image>
                <h2>{name}</h2>
                <h3>Tipos de acomodação:</h3>
                <p>{type}</p>
                <h3>Vagas disponíveis:</h3>
                <p>{vacancies}</p>
              </ImageContainer>);
          })}
        </>
      );        
    }
    else return 'Carregando';
  }
  return (
    <>
      {handleHospedations()}
    </>
  );
}

