import Cards from 'react-credit-cards';
import styled from 'styled-components';
import 'react-credit-cards/es/styles-compiled.css';
import { useState } from 'react';
import { useContext } from 'react';
import { UserTicketContext } from '../../contexts/UserTicketContext';
import UserContext from '../../contexts/UserContext';
import { toast } from 'react-toastify';
import { createCard } from '../../services/cardApi';
import { saveReservation } from '../../services/reservationApi';

export default function Card() {
  const { userTicket, setFinishPayment } = useContext(UserTicketContext);
  const { userData } = useContext(UserContext);
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');

  async function handleCard(e) {
    e.preventDefault();
    try {
      // const cardId = await createCard({
      //   number,
      //   name,
      //   expiry,
      //   cvc,
      //   userId: userData.user.id
      // });
      // const saveData = {
      //   ticketId: userTicket.id,
      //   cardId,
      // };
      // await saveReservation(saveData);

      localStorage.setItem('finishPayment', true);
      setFinishPayment(true);
    }
    catch {
      toast('Deu erro ao salvar os dados do cartão');
    }
  }
  
  return (
    <Container className="Card">
      <Cards number={number} name={name} expiry={expiry} cvc={cvc} focused={focus}/>
      <form onSubmit={handleCard}> 
        <InputsContainer>
          <Input
            type="tel" name="number" placeholder="Card Number" value={number}
            onChange={e => setNumber(e.target.value)}
            onFocus={e => setFocus(e.target.name)}/>
          <p>E.g.: 49..., 51..., 36..., 37...</p>
          <Input
            type="text" name="name" placeholder="Name" value={name}
            onChange={e => setName(e.target.value)}
            onFocus={e => setFocus(e.target.name)}/>
          <InputSubcontainer>
            <ExpiryInput
              type="text" name="expiry" placeholder="Valid Thru" value={expiry}
              onChange={e => setExpiry(e.target.value)}
              onFocus={e => setFocus(e.target.name)}/>
            <CvcInput
              type="tel" name="cvc" placeholder="CVC" value={cvc}
              onChange={e => setCvc(e.target.value)}
              onFocus={e => setFocus(e.target.name)}/>
          </InputSubcontainer>
        </InputsContainer>
        <Button type="submit">FINALIZAR PAGAMENTO</Button>
      </form>
    </Container>
  );
}

const Container = styled.div`
    max-width: 706px;
    height: 225px;
    display: flex; 
    margin-left: -9px;
    padding-top: 20px;
`;

const Button = styled.button`
    font-size: 14px;
    font-weight: 400;
    color: #000000;
    line-height: 16px;
    width: 182px;
    height: 37px;
    background-color: #E0E0E0;
    border: none;
    border-radius: 4px;
    margin-top: 37px;
    margin-left: -295px;
    cursor: pointer;
`;

const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    height: 185px;

        input {
            height: 42px;
            border: 0.5px solid #8E8E8E;
            border-radius: 5px;
            padding-left: 5px;

            &::placeholder {
                font-size: 18px;
                font-weight: 400;
                color: #8E8E8E;
            }
        }

        p {
            font-size: 15px;
            font-weight: 400;
            color: #8E8E8E;
            margin-top: 7px;
            margin-bottom: 15px;
        }
`;

const Input = styled.input`
    width: 95%;
`;

const InputSubcontainer = styled.div`
    display: flex;
    gap: 5%;
    margin-top: 18px;
`;

const ExpiryInput = styled.input`
    width: 65%;
`;
const CvcInput = styled.input`
    width: 25%;
`;
