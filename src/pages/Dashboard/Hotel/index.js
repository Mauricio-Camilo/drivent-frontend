import { UserMessageForOnlineTicket } from './../../../components/UserMessageForOnlineTicket';
import { UserMessageForPayment } from './../../../components/UserMessageForPayment';
import styled from 'styled-components';
import { useContext } from 'react';
import UserContext from '../../../contexts/UserContext';
import { UserTicketContext } from '../../../contexts/UserTicketContext';

import { TitleContainer, Button, NoDataContainer } from './../Payment/style';

export default function Hotel() {
  const { finishPayment, selectedTicket } = useContext(UserTicketContext);
  const isOnline = [...selectedTicket.keys()][0] === 'Online';
  return (
    <>
      {finishPayment ? // inserir o finishSubscription
        <>
          {isOnline?
            <TitleContainer>
              <div className="payment-title-and-subtitle">
                <h1>Ingresso e Pagamento</h1>
                <UserMessageForOnlineTicket />
              </div>
            </TitleContainer>
            :
            <>
              <TitleContainer>
                <div className="payment-title-and-subtitle">
                  <h1>Ingresso e Pagamento</h1>
                  <h3>Primeiro, escolha sua modalidade de ingresso</h3>
                </div>
              </TitleContainer>
            </>}
        </>
        :
        <>
          <TitleContainer>
            <div className="payment-title-and-subtitle">
              <h1>Ingresso e Pagamento</h1>
              <UserMessageForPayment />
            </div>
          </TitleContainer>
        </>}
    </>
  );
}

