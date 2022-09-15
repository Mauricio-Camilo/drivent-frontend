import { UserMessagePayment } from './../../../components/UserMessageSubscription';
import { useContext, useState } from 'react';
import UserContext from '../../../contexts/UserContext';
import { UserTicketContext } from '../../../contexts/UserTicketContext';

import TicketSelection from '../../../components/TicketSelection';
import ModalitySelection from '../../../components/ModalitySelection';

import { TitleContainer, Button, NoDataContainer } from './style';

export default function Payment() {
  const { finishSubscription, selectedTicket, selectedAccommodation } = useContext(UserTicketContext);

  function calculateFinalPrice(accommodation, ticket) {
    let accommodationPrice = 350;
    let ticketPrice = 100;
    if (ticket === 'Presencial') ticketPrice = 250;
    if (accommodation === 'Sem Hotel' || accommodation === undefined ) accommodationPrice = 0;
    return accommodationPrice + ticketPrice;
  }

  function handleFinishTicket() {
    const ticketStatus = [...selectedTicket.keys()][0];
    const accomodationStatus = [...selectedAccommodation.keys()][0];
    const finalPrice = calculateFinalPrice(accomodationStatus, ticketStatus);
    if (accomodationStatus !== undefined || ticketStatus === 'Online') {
      return <h3>{`Fechado! O total ficou em R$ ${finalPrice}. Agora é só confirmar:`}</h3>;
    }
    else return <></>;
  };

  return (
    <>
      {true ? // inserir o finishSubscription
        <>
          <TitleContainer>
            <div className="payment-title-and-subtitle">
              <h1>Ingresso e Pagamento</h1>
              <h3>Primeiro, escolha sua modalidade de ingresso</h3>
            </div>
            <TicketSelection />
          </TitleContainer>
          <TitleContainer>
            <ModalitySelection />
            <div className="payment-title-and-subtitle">
              {handleFinishTicket()}
            </div>
          </TitleContainer>
        </>
        :
        <>
          <TitleContainer>
            <div className="payment-title-and-subtitle">
              <h1>Ingresso e Pagamento</h1>
              <UserMessagePayment />
            </div>
          </TitleContainer>
        </>}
    </>
  );
}
