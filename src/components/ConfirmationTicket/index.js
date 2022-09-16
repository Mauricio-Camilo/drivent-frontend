import { useContext } from 'react';
import { UserTicketContext } from '../../contexts/UserTicketContext';

export default function ConfirmationTicket() {
  const { selectedTicket, selectedAccommodation, finishTicket, setFinishTicket } = useContext(UserTicketContext);

  function calculateFinalPrice(accommodation, ticket) {
    let accommodationPrice = 350;
    let ticketPrice = 100;
    if (ticket === 'Presencial') ticketPrice = 250;
    if (accommodation === 'Sem Hotel' || accommodation === undefined) accommodationPrice = 0;
    return accommodationPrice + ticketPrice;
  }

  function handleFinishTicket() {
    const ticketStatus = [...selectedTicket.keys()][0];
    const accomodationStatus = [...selectedAccommodation.keys()][0];
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

  function submit() {
    // README: SALVAR DIRETO NO LOCAL STORAGE
    setFinishTicket(true);
    localStorage.setItem('finishTicket', true);
  }

  return (
    <>
      {handleFinishTicket()}
    </>
  );
}
