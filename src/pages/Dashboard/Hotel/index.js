import { UserMessageForOnlineTicket } from './../../../components/UserMessageForOnlineTicket';
import { UserMessageForPayment } from './../../../components/UserMessageForPayment';
import { useContext } from 'react';
import { UserTicketContext } from '../../../contexts/UserTicketContext';
import { UserHotelContext } from '../../../contexts/UserHotelContext';

import { Hotels } from '../../../components/HotelComponents/Hotels';

import { TitleContainer } from './../Payment/style';
import { HotelsContainer } from './style';

export default function Hotel() {
  const { finishPayment, selectedTicket } = useContext(UserTicketContext);
  const { lastPage } = useContext(UserHotelContext);

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

  function handleConfirmationPage() {
    return (
      <TitleContainer>
        <div className="payment-title-and-subtitle">
          <h1>Escolha de hotel e quarto</h1>
          <h3>Você já escolheu seu quarto</h3>
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
              {!lastPage?
                <TitleContainer>
                  <div className="payment-title-and-subtitle">
                    <h1>Escolha de hotel e quarto</h1>
                    <h3>Primeiro, escolha seu hotel</h3>
                  </div>
                  <Hotels />
                </TitleContainer>
                :
                <>{handleConfirmationPage()}</>}
            </>}
        </>
        :
        <>
          {handleNoPaymentMessage()}
        </>}
    </>
  );
}

