import { useContext } from 'react';
import { UserTicketContext } from '../../contexts/UserTicketContext';
import UserContext from '../../contexts/UserContext';
import { saveReservation } from '../../services/reservationApi';

export default function ConfirmationTicket() {
  const { selectedTicket, selectedAccommodation, 
    finishTicket, setFinishTicket,
    userTicket, setUserTicket } = useContext(UserTicketContext);
  const { userData } = useContext(UserContext);

  const ticketStatus = [...selectedTicket.keys()][0];
  const accomodationStatus = [...selectedAccommodation.keys()][0];

  function calculateFinalPrice(accommodation, ticket) {
    let accommodationPrice = 350;
    let ticketPrice = 100;
    if (ticket === 'Presencial') ticketPrice = 250;
    if (accommodation === 'Sem Hotel' || accommodation === undefined) accommodationPrice = 0;
    return accommodationPrice + ticketPrice;
  }

  function handleFinishTicket() {
    const finalPrice = calculateFinalPrice(accomodationStatus, ticketStatus);
    if (accomodationStatus !== undefined || ticketStatus === 'Online') {
      return (
        <>
          <div className="payment-title-and-subtitle">
            <h3>{`Fechado! O total ficou em R$ ${finalPrice}. Agora é só confirmar:`}</h3>
            <button onClick={() => submit()}>RESERVAR INGRESSO</button>
          </div>
        </>);
    }
    else return <></>;
  };

  async function submit() {
    try {
      const saveTicket = {
        userId: userData.user.id,
        ticket: ticketStatus,
        accommodation: accomodationStatus,
        price: calculateFinalPrice(accomodationStatus, ticketStatus),
      };
      const ticketData = await saveReservation(saveTicket);
      if (ticketData.length !== 0) {
        setUserTicket(ticketData);
        // localStorage.setItem('ticketData', ticketData);
      }
      setFinishTicket(true);
      localStorage.setItem('finishTicket', true);
    }
    catch {
      alert('Deu erro ao enviar os dados');
    }
  }

  return (
    <>
      {handleFinishTicket()}
    </>
  );
}
