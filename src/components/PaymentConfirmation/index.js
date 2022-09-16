import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { BsFillCheckCircleFill } from 'react-icons/bs';

export default function PaymentConfirmation() {
  return (
    <>
      <PaymentText>
        <IconContext.Provider value={{ color: '#FFFFFF', className: 'check-icon', size: '25px' }}>
          <BsFillCheckCircleFill />
        </IconContext.Provider>
        <div className='text'>
          <h1>Pagamento confirmado!</h1>
          <h2>Prossiga para escolha de hospedagem e atividades</h2>
        </div>
      </PaymentText>
    </>
  );
}

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
