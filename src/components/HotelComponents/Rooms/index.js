import { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getSelectedHotelRooms } from '../../../services/hotelsApi';
import { updateRoomVacancy, getVacanciesInRoom } from '../../../services/vacanciesApi';
import UserContext from '../../../contexts/UserContext';
import { UserHotelContext } from '../../../contexts/UserHotelContext';
import { HotelsContainer, ImageContainer, Image, RoomsContainer, Room, IconsContainer, Icon, IconStatus, IconFill, Button } from './../Hotels/style';
import { BsPersonFill, BsPerson } from 'react-icons/bs';

export default function Rooms() {
  const { selectedHotel, setSelectedHotel,
    roomsData, setRoomsData, 
    selectedRoom, setSelectedRoom,
    selectedUser, setSelectedUser,
    lastRoomSelected, setLastRoomSelected,
    lastPage, setLastPage } = useContext(UserHotelContext);

  const { userData } = useContext(UserContext);
  const [updateRoom, setUpdateRoom] = useState(false);

  function activateVacancy(id, number) {
    const alreadySelected = selectedUser.has(id);
    if (alreadySelected) {
      selectedUser.delete(id);
      selectedRoom.delete(number);
      setSelectedUser(new Map(selectedUser));
      setSelectedRoom(new Map(selectedRoom));
    }
    else {
      selectedUser.clear();
      selectedRoom.clear();
      setSelectedUser(new Map(selectedUser.set(id)));
      setSelectedRoom(new Map(selectedRoom.set(number)));
    }
    console.log([...selectedRoom.keys()][0]);
  }

  async function getAllRooms() {
    try {
      const hotelName = [...selectedHotel.keys()][0];
      if (hotelName !== undefined) {
        const response = await getSelectedHotelRooms(hotelName);
        setRoomsData(response);
      }
      else {
        setRoomsData(null);
      }
    }
    catch {
      toast('Não foi possível renderizar os quartos!');
    }
  }

  function handleRooms() {
    if (roomsData === undefined || roomsData === null) {
      return <></>;
    }
    else {
      return (
        <>
          {roomsData.map(room => {
            const { id, number, isBlocked } = room;
            const checkSelectedRoom = selectedRoom.has(number);
            return (
              <Room key={id} blocked={isBlocked} selected={checkSelectedRoom}>
                <h2>{number}</h2>
                <IconsContainer>
                  {room.Vacancy.map(vacancy => {
                    const { id, userId } = vacancy;
                    let ableVacancy = true;
                    if (userId !== null) ableVacancy = false;
                    const checkSelectedUser = selectedUser.has(id);
                    if (userId === null) {
                      if ([...selectedUser.keys()][0] === id) return (
                        <IconStatus key={id} ableVacancy={ableVacancy} selected={checkSelectedUser} onClick={() => activateVacancy(id, number)}><BsPersonFill /></IconStatus>
                      );
                      else return (
                        <Icon key={id} onClick={() => activateVacancy(id, number)}><BsPerson /></Icon>
                      );
                    }
                    else {
                      return (
                        <IconFill key={id} ableVacancy={ableVacancy} blocked={isBlocked} selected={checkSelectedUser} onClick={() => activateVacancy(id, number)}><BsPersonFill /></IconFill>
                      );
                    }
                  })}
                </IconsContainer>
              </Room>
            );
          })}
        </>
      );
    }
  }

  async function submitVacancy() {
    if ([...selectedUser.keys()][0] === undefined) {
      return toast('Não foi possível renderizar os hotéis!');
    }
    try {
      const vacancyId = [...selectedUser.keys()][0];
      const userId = userData.user.id;
      const data = { updateRoom, removeId: lastRoomSelected };
      await updateRoomVacancy(userId, vacancyId, data);
      localStorage.setItem('lastHotelPage', true);
      setLastPage(true);
      setUpdateRoom(false);
    }
    catch {
      toast('Não foi possível preencher a vaga do quarto!');
    }
  }

  getAllRooms();

  return (
    <>
      <RoomsContainer>
        {handleRooms()}
      </RoomsContainer>
      <Button onClick={() => submitVacancy()}>RESERVAR QUARTO</Button>
    </>
  );
}
