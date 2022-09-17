import styled from 'styled-components';

const UserMessageForActivityWithOnlineModality = () => {
  return (
    <Background>
      <Message>
        Sua modalidade de ingresso não necessita escolher
        <br></br> atividade. Você terá acesso a todas as atividades.
      </Message>
    </Background>
  );
};

export { UserMessageForActivityWithOnlineModality };

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
