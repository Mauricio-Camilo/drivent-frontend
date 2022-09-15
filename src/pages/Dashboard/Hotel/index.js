/* eslint-disable no-console */
import { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { BsPersonFill, BsPerson } from 'react-icons/bs';

import { getSelectedHotelRooms, getAllHotels } from '../../../services/hotelsApi';
import { updateRoomVacancy, getVacanciesInRoom } from '../../../services/vacanciesApi';

import UserContext from './../../../contexts/UserContext';
import { UserTicketContext } from '../../../contexts/UserTicketContext';
import { UserHotelContext } from '../../../contexts/UserHotelContext';
import { UserFormContext } from '../../../contexts/UserFormContext';
import { UserPaymentContext } from '../../../contexts/ConfirmUserPayment';
import api from '../../../../src/services/api';

import resort from '../../../assets/images/Resort.svg';
import palace from '../../../assets/images/Palace.svg';
import world from '../../../assets/images/World.svg';

import { PaymentContainer, NoDataContainer } from './../Payment/style';
import { HotelsContainer, ImageContainer, Image, RoomsContainer, Room, IconsContainer, Icon, IconStatus, IconFill, Button } from './style';

export default function Hotel() {
  const { userData } = useContext(UserContext);
  const { userTicket, finishTicket, bookTicket, setFinishTicket } = useContext(UserTicketContext);
  const { userHotel, lastRoomSelected, setLastRoomSelected, hotelInDb, setHotelInDb, auxHotelInDb, setAuxHotelInDb } = useContext(UserHotelContext);
  const { usePayment } = useContext(UserFormContext);
  const { ticketInDb } = useContext(UserPaymentContext);

  const [loadPage, setLoadPage] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(new Map());
  const [selectedRoom, setSelectedRoom] = useState(new Map());
  const [selectedUser, setSelectedUser] = useState(new Map());
  const [hotels, setHotels] = useState();
  const [roomsData, setRoomsData] = useState();
  const [lastPage, setLastPage] = useState(false);
  const [updateRoom, setUpdateRoom] = useState(false);
  const [resumeCard, setResumeCard] = useState({});
  
  const h3First = finishTicket && userTicket.type === 'Presencial' && 
  userHotel.type === 'Com Hotel' ? 'Você já escolheu seu quarto' : '';
  const h3Second = finishTicket && userTicket.type === 'Presencial' && 
  userHotel.type === 'Com Hotel' ? 'Primeiro, escolha seu hotel' : '';

  useEffect(() => {
    async function getHotels() {
      setLoadPage(false);
      try {
        const response = await getAllHotels();
        setHotels(response);
        if (response.data.length !== 0) {
          setLoadPage(true);
        }
      }
      catch {
        toast('Não foi possível renderizar os hotéis!');
        setLoadPage(false);
      }
    } getHotels();
  }, [lastPage]);

  useEffect(() => {
    async function checkHotelReservationInDb() {
      setHotelInDb({ boolean: false });
      try {
        const response = await api.get(`/hotels/user/${userData.user.id}`);
        if (response.data.length !== 0) {
          setHotelInDb({ boolean: true, response: response.data });
        }
      }
      catch {
        setHotelInDb({ boolean: false });
      }
    } checkHotelReservationInDb();
  }, []);

  async function activateHotel(hotel) {
    const alreadySelected = selectedHotel.has(hotel);
    if (alreadySelected) {
      selectedHotel.delete(hotel);
      setSelectedHotel(new Map(selectedHotel));
    }
    else {
      selectedHotel.clear();
      selectedRoom.clear();
      selectedUser.clear();
      setSelectedHotel(new Map(selectedHotel.set(hotel)));
      selectedRoom.clear();
      selectedUser.clear();
    }
    await getAllRooms();
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
  }
  
  function handleHospedations() {
    if (userTicket.type === 'Presencial' && userHotel.type === 'Com Hotel') {
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
              </ImageContainer>
            );
          })}
        </>
      );
    }
    else {
      return <></>;
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
      setLastPage(true);
      setUpdateRoom(false);
      const vac = await getVacanciesInDb();
      if (vac.length !== 0) {
        const checkVac = checkVacanciesInRoom(vac);
        setResumeCard(checkVac);
      }
    }
    catch {
      toast('Não foi possível preencher a vaga do quarto!');
    }
  }

  async function restartReservation() {
    setLastPage(false);
    localStorage.getItem('room', [...selectedUser.keys()][0]);
    setLastRoomSelected([...selectedUser.keys()][0]);
    selectedHotel.clear();
    selectedRoom.clear();
    selectedUser.clear();
    setLoadPage(true);
    setUpdateRoom(true);
  }

  async function getVacanciesInDb() {
    const vacancyId = [...selectedUser.keys()][0];
    const res = await getVacanciesInRoom(vacancyId);
    return res;
  }

  function checkVacanciesInRoom(res) {
    let roomData = [];
    let hotelName = '';
    let hotelImage = '';
    for (let i = 0; i < hotels.length; i++) {
      if (hotels[i].name === [...selectedHotel.keys()][0]) {
        hotelName = hotels[i].name;
        hotelImage = hotels[i].image;
      }
    }
    for (let i = 0; i < roomsData.length; i++) {
      if (roomsData[i].number === [...selectedRoom.keys()][0]) {
        roomData.push(roomsData[i]);
      }
    }
    if (roomData.length !== 0) {
      let roomType = '';
      roomData[0].Vacancy.length === 1 ? roomType = 'Single' : roomData[0].Vacancy.length === 2 ? roomType = 'Double' : roomType = 'Triple';
      let vacanciesCount = res.vacancies;
      let peoplesInYourRoom = '';
      if (roomData[0].Vacancy.length === 3 && vacanciesCount === 0) {
        peoplesInYourRoom = 'Você e mais 2';
      } else if ((roomData[0].Vacancy.length === 2 && vacanciesCount === 0) || (roomData[0].Vacancy.length === 3 && vacanciesCount === 1)) {
        peoplesInYourRoom = 'Você e mais 1';
      } else if ((roomData[0].Vacancy.length === 1 && vacanciesCount === 0) || (roomData[0].Vacancy.length === 2 && vacanciesCount === 1) || (roomData[0].Vacancy.length === 3 && vacanciesCount === 2)) {
        peoplesInYourRoom = 'Apenas você';
      }
      const renderResume = {
        hotelName: hotelName,
        hotelImage: hotelImage,
        roomNumber: [...selectedRoom.keys()][0],
        roomType: roomType,
        peoplesInYourRoom: peoplesInYourRoom,
      };
      return renderResume;
    } else {
      console.log(roomData);
    }
  }

  if (hotelInDb.boolean) {
    (async() => {
      if (hotelInDb.response.response.name === 'Driven Resort') setAuxHotelInDb({ image: resort });
      else if (hotelInDb.response.response.name === 'Driven Palace') setAuxHotelInDb({ image: palace });
      else if (hotelInDb.response.response.name === 'Driven World') setAuxHotelInDb({ image: world });

      if (hotelInDb.response.vacancies.numberOfBedrooms === 3 && hotelInDb.response.vacancies.vacancies === 0) {
        setAuxHotelInDb({ peoplesInYourRoom: 'Você e mais 2' });
      }
      else if ((hotelInDb.response.vacancies.numberOfBedrooms === 2 && hotelInDb.response.vacancies.vacancies === 0) || (hotelInDb.response.vacancies.numberOfBedrooms === 3 && hotelInDb.response.vacancies.vacancies === 1)) {
        setAuxHotelInDb({ peoplesInYourRoom: 'Você e mais 1' });
      }
      else if ((hotelInDb.response.vacancies.numberOfBedrooms === 1 && hotelInDb.response.vacancies.vacancies === 0) || (hotelInDb.response.vacancies.numberOfBedrooms === 2 && hotelInDb.response.vacancies.vacancies === 1) || (hotelInDb.response.vacancies.numberOfBedrooms === 3 && hotelInDb.response.vacancies.vacancies === 2)) {
        setAuxHotelInDb({ peoplesInYourRoom: 'Apenas você' });
      }
    })();
  };
  console.log('condição 1: ' + hotelInDb.boolean);
  console.log('condição 2: ' + (lastPage && !hotelInDb.boolean));
  console.log('condição *: ' + !usePayment);
  console.log('condição 3: ' + (bookTicket && finishTicket && userTicket.type === 'Presencial' && userHotel.type === 'Sem Hotel'));
  console.log('condição 4: ' + !finishTicket);
  console.log('condição 1: ' + auxHotelInDb);
  return (
    (hotelInDb.boolean) ? (
      <PaymentContainer>
        <div className="payment-title-and-subtitle">
          <h1>Escolha de hotel e quarto</h1>
          <h3>{h3First}</h3>
        </div>
        <ImageContainer selected={true}>
          <Image src={auxHotelInDb.image}></Image>
          <h2>{hotelInDb.response.response.name}</h2>
          <h3>Quarto reservado</h3>
          <p>{`${hotelInDb.response.response.number} (${hotelInDb.response.response.type})`}</p>
          <h3>Pessoas no seu quarto</h3>
          <p>{auxHotelInDb.peoplesInYourRoom}</p>
        </ImageContainer>
        <Button onClick={() => restartReservation()}>TROCAR DE QUARTO</Button>
      </PaymentContainer>
    ) : (lastPage && !hotelInDb.boolean) ? (
      <PaymentContainer>
        <div className="payment-title-and-subtitle">
          <h1>Escolha de hotel e quarto</h1>
          <h3>{h3First}</h3>
        </div>
        <ImageContainer selected={true}>
          <Image src={resumeCard.hotelImage}></Image>
          <h2>{resumeCard.hotelName}</h2>
          <h3>Quarto reservado</h3>
          <p>{`${resumeCard.roomNumber} (${resumeCard.roomType})`}</p>
          <h3>Pessoas no seu quarto</h3>
          <p>{resumeCard.peoplesInYourRoom}</p>
        </ImageContainer>
        <Button onClick={() => restartReservation()}>TROCAR DE QUARTO</Button>
      </PaymentContainer>
    ) : (bookTicket && finishTicket && userTicket.type === 'Presencial' && userHotel.type === 'Sem Hotel') ? (
      <NoDataContainer>
        <div className="title">
          <h1>Escolha de hotel e quarto</h1>
        </div>
        <div className="alert">
          <h3>Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades.</h3>
        </div>
      </NoDataContainer>
    ) : (!finishTicket && !hotelInDb.boolean) ? (
      <NoDataContainer>
        <div className="title">
          <h1>Escolha de hotel e quarto</h1>
        </div>
        <div className="alert">
          <h3>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem.</h3>
        </div>
      </NoDataContainer>
    ) : (bookTicket && finishTicket && userTicket.type === 'Online') ? (
      <NoDataContainer>
        <div className="title">
          <h1>Escolha de hotel e quarto</h1>
        </div>
        <div className="alert">
          <h3>Sua modalidade de ingresso não inclui hospedagem.</h3>
        </div>
      </NoDataContainer>
    ) : (
      <PaymentContainer>
        <div className="payment-title-and-subtitle">
          <h1>Escolha de hotel e quarto</h1>
          <h3>{h3Second}</h3>
        </div>
        <HotelsContainer>
          {handleHospedations()}
        </HotelsContainer>
        {[...selectedHotel.keys()][0] === undefined ?
          <></>
          :
          <>
            <div className="payment-title-and-subtitle">
              <h3>Ótima pedida, agora escolha o seu quarto</h3>
            </div>
            <RoomsContainer>
              {handleRooms()}
            </RoomsContainer>
            <Button onClick={() => submitVacancy()}>RESERVAR QUARTO</Button>
          </>
        }
      </PaymentContainer>
    )
  );
}

