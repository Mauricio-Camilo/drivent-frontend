import styled from 'styled-components';
import { useContext } from 'react';
import { UserTicketContext } from '../../contexts/UserTicketContext';

export default function TicketSelection() {
  const { selectedTicket, setSelectedTicket, selectedAccommodation } = useContext(UserTicketContext);

  function activateTicket(option) {
    const alreadySelected = selectedTicket.has(option);
    if (alreadySelected) {
      selectedTicket.delete(option);
      setSelectedTicket(new Map(selectedTicket));
    }
    else {
      selectedTicket.clear();
      setSelectedTicket(new Map(selectedTicket.set(option)));
    }
    if ([...selectedTicket.keys()[0] !== 'Presencial']) {
      selectedAccommodation.clear();
    }
    console.log([...selectedTicket.keys()]);
  }

  const handleTicket = () => {
    const tickets = [
      { id: '1', option: 'Presencial', price: 250 },
      { id: '2', option: 'Online', price: 100 }
    ];

    return (
      tickets.map(ticket => {
        const { option, id, price } = ticket;
        const checkSelectedTicket = selectedTicket.has(option);
        return (
          <Button key={id} 
            selected={checkSelectedTicket} 
            onClick={() => activateTicket(option)}>
            <h5>{option}</h5>
            <p>{`R$ ${price}`}</p>
          </Button>
        );
      })
    );
  };
  return (
    <>
      {handleTicket()}
    </>
  );
};

const Button = styled.button`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  width: 145px;
  height: 145px;
  border: 1px solid #CECECE;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 24px;
  background-color: ${(props) => props.selected ? '#FFEED2' : '#FFFFFF'};

  :last-child {
    margin-right: 0;
  }
  
  h5 {
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #454545;
    margin-bottom: 3px;
  }

  p {
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #898989;
  }
`;
