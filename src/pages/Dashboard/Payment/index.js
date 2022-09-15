import { UserMessagePayment } from './../../../components/UserMessageSubscription';
import styled from 'styled-components';
import { useContext } from 'react';
import UserContext from '../../../contexts/UserContext';
import { UserTicketContext } from '../../../contexts/UserTicketContext';

export default function Payment() {
  const teste = useContext(UserTicketContext);

  console.log(teste);

  // return 'Pagamento: Em breve!';
  return (
    <>
      <TitleContainer>
        <div className="payment-title-and-subtitle">
          <h1>Ingresso e Pagamento</h1>
        </div>
      </TitleContainer>
      {false ?
        <><h1>Inscrição feita com sucesso</h1></>
        :
        <UserMessagePayment />}
    </>
  );
}

const TitleContainer = styled.div`
  .payment-title-and-subtitle {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;

    h1 {
      font-size: 34px;
      line-height: 40px;
      color: #000000;
    }

    h3 {
      font-size: 20px;
      line-height: 23px;
      color: #8E8E8E;
      margin-bottom: 17px;
      padding-top:25px;
    }

    button {
      width: 162px;
      height: 37px;
      background-color: #E0E0E0;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
      border-radius: 4px;
      border: none;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      text-align: center;

      color: #000000;

      cursor: pointer;
    }
  }
`;
