import styled from 'styled-components';

const UserMessageForActivityWithOnlineModality = () => {
  return (
    <Background>
      <Message>
        Sua modalidade de ingresso não necessita escolher
      </Message>
      <Message2>
        atividade. Você terá acesso a todas as atividades.
      </Message2>
    </Background>
  );
};

export { UserMessageForActivityWithOnlineModality };

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
