import { UserMessageSubscription } from './../../../components/UserMessageSubscription';
import { useContext, useState } from 'react';
import UserContext from '../../../contexts/UserContext';
import { UserTicketContext } from '../../../contexts/UserTicketContext';

import TicketSelection from '../../../components/TicketSelection';
import ModalitySelection from '../../../components/ModalitySelection';
import ConfirmationTicket from '../../../components/ConfirmationTicket';
import CardPage from '../../../components/CardSection';

import { TitleContainer } from './style';

export default function Payment() {
  const { finishTicket, finishSubscription } = useContext(UserTicketContext);

  function handleNoSubscriptionMessage() {
    return (
      <TitleContainer>
        <div className="payment-title-and-subtitle">
          <h1>Ingresso e Pagamento</h1>
          <UserMessageSubscription />
        </div>
      </TitleContainer>
    );
  }

  return (
    <>
      {finishSubscription ? // inserir o finishSubscription
        <>
          {finishTicket ?
            <CardPage />
            :
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
                <ConfirmationTicket />
              </TitleContainer>
            </>}
        </>
        :
        <>
          {handleNoSubscriptionMessage()}
        </>}
    </>
  );
}
