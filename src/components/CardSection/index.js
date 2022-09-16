import { useContext } from 'react';
import { UserTicketContext } from '../../contexts/UserTicketContext';
import { TitleContainer, Ticket } from '../../pages/Dashboard/Payment/style';
import Card from './../../components/CreditCard';
import PaymentConfirmation from './../../components/PaymentConfirmation';

export default function CardPage() {
  const { finishPayment, setFinishPayment } = useContext(UserTicketContext);

  function handleTicket() {
    // README: PEGAR INFOS DE OUTRA PÁGINA OU DO BACK-END  
    const userTicket = { type: 'Presencial', price: '100' };
    const userHotel = { type: 'Sem hotel' };
    const totalPrice = 100;
    return (
      <Ticket>
        {userTicket.type === 'Online'?
          <>
            <h4>{userTicket.type}</h4> 
            <p>R$ {userTicket.price}</p>
          </>
          :
          <>
            <h4>{userTicket.type} + {userHotel.type}</h4>
            <p>R$ {totalPrice}</p> 
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
