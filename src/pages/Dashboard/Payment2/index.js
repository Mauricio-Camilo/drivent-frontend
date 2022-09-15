import styled from 'styled-components';
import UserContext from '../../../contexts/UserContext';
import { useContext } from 'react';
import { IconContext } from 'react-icons';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import Card from '../../../components/CreditCard';
import { UserTicketContext } from '../../../contexts/UserTicketContext';
import { UserHotelContext } from '../../../contexts/UserHotelContext';

export default function Payment2() {
  const { userData } = useContext(UserContext);
  const { finishTicket, userTicket } = useContext(UserTicketContext);
  const { userHotel } = useContext(UserHotelContext);

  function handleCreditCard() {
    const totalPrice = userTicket.price + userHotel.price;
    return (
      <PaymentContainer>
        <div className="payment-title-and-subtitle">
          <h1>Ingresso e Pagamento</h1>
          <h3>Ingresso Escolhido</h3>
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
              </>
            }
          </Ticket>
        </div>
        <div className="payment-title-and-subtitle">
          <h3>Pagamento</h3>
        </div>
        {finishTicket ? 
          <PaymentText>
            <IconContext.Provider value={{ color: '#FFFFFF', className: 'check-icon', size: '25px' }}>
              <BsFillCheckCircleFill />
            </IconContext.Provider>
            <div className='text'>
              <h1>Pagamento confirmado!</h1>
              <h2>Prossiga para escolha de hospedagem e atividades</h2>
            </div>
          </PaymentText>
          :
          <Card id={userData.user.id} />}
      </PaymentContainer>
    );
  }

  return (
    <>
      {handleCreditCard()}
    </>
  );
}

const PaymentContainer = styled.div`
  .payment-title-and-subtitle {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;

    h1 {
      font-size: 34px;
      line-height: 40px;
      color: #000000;
      /* padding-bottom: 17px; */
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

      font-family: 'Roboto';
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      text-align: center;

      color: #000000;

      cursor: pointer;
    }
  }
`;

const PaymentText = styled.div`
  margin-top: 16.83px;
  display: flex;
  gap: 15px;

  .check-icon {
    width: 40.33px;
    height: 40.33px;
    fill: #36B853;
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 5px;

    color: #454545;

    h1 {
      font-weight: 700;
    }

    h2 {
      font-weight: 400;
    }
  }
`;

const Ticket = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  width: 290px;
  height: 108px;
  border: 1px solid #CECECE;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-right: 24px;
  background-color: #FFEED2;

    h4 {
      font-family: 'Roboto';
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: #454545;      
    }

    p {
      font-family: 'Roboto';
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #898989;      
    }
`;

export { PaymentText, Ticket };
