import { UserMessageForOnlineTicket } from './../../../components/UserMessageForOnlineTicket';
import { UserMessageForPayment } from './../../../components/UserMessageForPayment';
import { useContext } from 'react';
import UserContext from '../../../contexts/UserContext';
import { UserTicketContext } from '../../../contexts/UserTicketContext';

import { Hotels } from '../../../components/HotelComponents/Hotels';

import { TitleContainer } from './../Payment/style';
import { HotelsContainer } from './style';

export default function Hotel() {
  const { finishPayment, selectedTicket } = useContext(UserTicketContext);
  const isOnline = [...selectedTicket.keys()][0] === 'Online';

  function handleOnlineTicketMessage() {
    return (
      <TitleContainer>
        <div className="payment-title-and-subtitle">
          <h1>Escolha de hotel e quarto</h1>
          <UserMessageForOnlineTicket />
        </div>
      </TitleContainer>
    );
  }

  function handleNoPaymentMessage() {
    return (
      <TitleContainer>
        <div className="payment-title-and-subtitle">
          <h1>Escolha de hotel e quarto</h1>
          <UserMessageForPayment />
        </div>
      </TitleContainer>
    );
  }
  return (
    <>
      {finishPayment ? 
        <>
          {isOnline ?
            <>
              {handleOnlineTicketMessage()}
            </>
            :
            <>
              <TitleContainer>
                <div className="payment-title-and-subtitle">
                  <h1>Escolha de hotel e quarto</h1>
                  <h3>Primeiro, escolha seu hotel</h3>
                </div>
                <HotelsContainer>
                  <Hotels />
                </HotelsContainer>
              </TitleContainer>
            </>}
        </>
        :
        <>
          {handleNoPaymentMessage()}
        </>}
    </>
  );
}

