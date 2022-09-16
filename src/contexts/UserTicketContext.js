import { createContext, useState } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const UserTicketContext = createContext();

function UserTicketProvider({ children }) {
  // const [userTicket, setUserTicket] = useState(localStorage.getItem('ticketData'));
  const [userTicket, setUserTicket] = useLocalStorage('userTicket', {});

  const [bookTicket, setBookTicket] = useState(false);
  // usei a partir daqui
  const [selectedTicket, setSelectedTicket] = useState(new Map());
  const [selectedAccommodation, setSelectedAccommodation] = useState(new Map());
  //README: PEGAR ESSAS INFORMAÇÕES DO LOCAL STORAGE
  const [finishSubscription, setFinishSubscription] = useState(localStorage.getItem('finishSubscription'));
  const [finishTicket, setFinishTicket] = useState(localStorage.getItem('finishTicket'));
  const [finishPayment, setFinishPayment] = useState(localStorage.getItem('finishPayment'));

  return (
    <UserTicketContext.Provider value={{ userTicket, setUserTicket, bookTicket, setBookTicket,
      finishTicket, setFinishTicket, finishSubscription, setFinishSubscription, selectedTicket, 
      setSelectedTicket, selectedAccommodation, setSelectedAccommodation, finishPayment, setFinishPayment }}>
      {children}
    </UserTicketContext.Provider>
  );
}

export { UserTicketContext,  UserTicketProvider };
