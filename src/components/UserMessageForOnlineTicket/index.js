import styled from 'styled-components';

const UserMessageForOnlineTicket = () => {
  return (
    <Background>
      <Message>
        Sua modalidade de ingresso não inclui hospedagem 
        <br></br> Prossiga para a escolha de atividades
      </Message>
    </Background>
  );
};

export { UserMessageForOnlineTicket };

const Background = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 250px;
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
