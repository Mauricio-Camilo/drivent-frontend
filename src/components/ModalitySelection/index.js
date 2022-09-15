import styled from 'styled-components';
import { useContext } from 'react';
import { UserTicketContext } from '../../contexts/UserTicketContext';

export default function ModalitySelection() {
  const { selectedTicket, selectedAccommodation, setSelectedAccommodation } = useContext(UserTicketContext);

  function activateAccomodation(id) {
    const alreadySelected = selectedAccommodation.has(id);
    if (alreadySelected) {
      selectedAccommodation.delete(id);
      setSelectedAccommodation(new Map(selectedAccommodation));
    }
    else {
      selectedAccommodation.clear();
      setSelectedAccommodation(new Map(selectedAccommodation.set(id)));
    }
    console.log([...selectedAccommodation.keys()]);
  }

  function handleAccommodationtitle() {
    if ([...selectedTicket.keys()][0] === 'Presencial') {
      return (
        <div className="payment-title-and-subtitle">
          <h3>Ótimo, agora escolha sua modalidade de hospedagem</h3>
        </div>
      );
    }
    else return <></>;
  };

  function handleAccommodation() {
    const accommodations = [
      { id: '1', option: 'Sem Hotel', price: 0 },
      { id: '2', option: 'Com Hotel', price: 350 }
    ];

    if ([...selectedTicket.keys()][0] === 'Presencial') {
      return (
        accommodations.map(accomodation => {
          const { option, id, price } = accomodation;
          const checkSelectedAccommodation = selectedAccommodation.has(option);
          return (
            <Button key={id} selected={checkSelectedAccommodation} 
              onClick={() => activateAccomodation(option, price)}>
              <h5>{option}</h5>
              <p>{`R$ ${price}`}</p>
            </Button>
          );
        })
      );
    }
    else return <></>;
  };

  return (
    <>
      {handleAccommodationtitle()}
      {handleAccommodation()}
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
