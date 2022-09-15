import styled from 'styled-components';

const UserMessagePayment = () => {
  return (
    <Background>
      <Message>
        Você precisa completar sua inscrição antes <br></br> de prosseguir pra escolha de ingresso
      </Message>
    </Background>
  );
};

export { UserMessagePayment  };

const Background = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 150px;
`;

const Message = styled.p`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #8E8E8E;
`;
