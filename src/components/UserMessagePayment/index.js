import styled from 'styled-components';

const UserMessagePayment = () => {
  return (
    <Background>
      <Message>
        Você precisa ter confirmado pagamento antes
      </Message>
      <Message2>
        de fazer a escolha de hospedagem
      </Message2>
    </Background>
  );
};

export { UserMessagePayment  };

const Background = styled.div`
    width: 100vw;
    margin: 170px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    z-index: 7;
`;

const Message = styled.p`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #8E8E8E;
    z-index: 10;
`;

const Message2 = styled.p`
    padding: 3px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #8E8E8E;
    z-index: 10;
`;
