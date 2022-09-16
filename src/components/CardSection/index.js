import { useContext } from 'react';
import { UserTicketContext } from '../../contexts/UserTicketContext';
import { TitleContainer, Ticket } from '../../pages/Dashboard/Payment/style';
import Card from './../../components/CreditCard';
import PaymentConfirmation from './../../components/PaymentConfirmation';

export default function CardPage() {
  const { finishPayment, setFinishPayment,
    userTicket, setUserTicket } = useContext(UserTicketContext);

  console.log('pagina de cartao:', userTicket);

  function handleTicket() {
    const { ticket, accommodation, price } = userTicket;
    return (
      <Ticket>
        {ticket === 'Online'?
          <>
            <h4>{ticket}</h4> 
            <p>R$ {price}</p>
          </>
          :
          <>
            <h4>{ticket} + {accommodation}</h4>
            <p>R$ {price}</p> 
          </>}
      </Ticket>
    ); 
  }
  return (
    <>
      <TitleContainer>
        <div className="payment-title-and-subtitle">
          <h1>Ingresso e Pagamento</h1>
          <h3>Ingresso Escolhido</h3>
        </div>
        {handleTicket()}
        <div className="payment-title-and-subtitle">
          <h3>Pagamento</h3>
        </div>
      </TitleContainer> 
      {finishPayment?
        <PaymentConfirmation />
        :
        <Card />}
    </>
  );
}
