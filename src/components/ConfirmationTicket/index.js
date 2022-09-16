import { useContext } from 'react';
import { UserTicketContext } from '../../contexts/UserTicketContext';
import UserContext from '../../contexts/UserContext';
import { saveTicket } from '../../services/reservationApi';
import { toast } from 'react-toastify';

export default function ConfirmationTicket() {
  const { selectedTicket, selectedAccommodation, 
    setFinishTicket, setUserTicket } = useContext(UserTicketContext);
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
      const ticket = {
        userId: userData.user.id,
        ticket: ticketStatus,
        accommodation: accomodationStatus === undefined? '' : accomodationStatus,
        price: calculateFinalPrice(accomodationStatus, ticketStatus),
      };
      const ticketData = await saveTicket(ticket);
      if (ticketData.length !== 0) {
        setUserTicket(ticketData);
      }
      setFinishTicket(true);
      localStorage.setItem('finishTicket', true);
      localStorage.setItem('ticket', ticketStatus);
      localStorage.setItem('accommodation', accomodationStatus);
    }
    catch {
      toast('Deu erro ao salvar o ticket');
    }
  }

  return (
    <>
      {handleFinishTicket()}
    </>
  );
}
