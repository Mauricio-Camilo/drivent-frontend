import { useContext } from 'react';
import { UserHotelContext } from '../../../contexts/UserHotelContext';

import { TitleContainer } from './../../../pages/Dashboard/Payment/style';
import { ImageContainer, Image, Button } from './../Hotels/style';

export function HotelConfirmation() {
  const { selectedHotel, selectedRoom, selectedUser,
    setLastPage, registeredHotel, setUpdateRoom } = useContext(UserHotelContext);

  function handleHotelConfirmation() {
    const { image, hotel, room, type, message } = registeredHotel;
    return (
      <>
        <ImageContainer selected={true}>
          <Image src={image}></Image>
          <h2>{hotel}</h2>
          <h3>Quarto reservado</h3>
          <p>{`${room} (${type})`}</p>
          <h3>Pessoas no seu quarto</h3>
          <p>{message}</p>
        </ImageContainer>
        <Button onClick={() => restartReservation()}>TROCAR DE QUARTO</Button>
      </>
    );
  };

  async function restartReservation() {
    setLastPage(false);
    localStorage.removeItem('lastHotelPage');
    selectedHotel.clear();
    selectedRoom.clear();
    selectedUser.clear();
    setUpdateRoom(true);
  }

  return (
    <TitleContainer>
      <div className="payment-title-and-subtitle">
        <h1>Escolha de hotel e quarto</h1>
        <h3>Você já escolheu seu quarto</h3>
      </div>
      {handleHotelConfirmation()}
    </TitleContainer>
  );
}
