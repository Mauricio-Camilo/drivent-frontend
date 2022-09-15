import { UserMessagePayment } from './../../../components/UserMessageSubscription';
import styled from 'styled-components';
import { useContext } from 'react';
import UserContext from '../../../contexts/UserContext';
import { UserTicketContext } from '../../../contexts/UserTicketContext';

import { TitleContainer, Button, NoDataContainer } from './../Payment/style';

export default function Hotel() {
  const { finishSubscription } = useContext(UserTicketContext);

  return (
    <>
      <TitleContainer>
        <div className="payment-title-and-subtitle">
          <h1>Ingresso e Pagamento</h1>
          {true ? // trocar depois para finishSubscription
            <>
              <h3>Primeiro, escolha sua modalidade de ingresso</h3>
            </>
            :
            <UserMessagePayment />}
        </div>
      </TitleContainer>
    </>
  );
}

