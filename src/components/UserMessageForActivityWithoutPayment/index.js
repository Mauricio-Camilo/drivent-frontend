import styled from 'styled-components';

const UserMessageForActivityWithoutPayment = () => {
  return (
    <Background>
      <Message>
        Você precisa ter confirmado pagamento antes de fazer a escolha de atividades.
      </Message>
    </Background>
  );
};

export { UserMessageForActivityWithoutPayment };

const Background = styled.div`
    width: 100vw;
    height: 100%;
    /* height: calc(100% - 40px); */
    /* margin: 170px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    /* z-index: 7; */
`;

const Message = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #8E8E8E;
    /* z-index: 10; */
`;
