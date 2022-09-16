import { createContext, useState } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const UserTicketContext = createContext();

function UserTicketProvider({ children }) {
  const [userTicket, setUserTicket] = useLocalStorage('userTicket', undefined);
  const [bookTicket, setBookTicket] = useState(false);
  // usei a partir daqui
  const [finishSubscription, setFinishSubscription] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(new Map());
  const [selectedAccommodation, setSelectedAccommodation] = useState(new Map());
  const [finishTicket, setFinishTicket] = useState(false);
  const [finishPayment, setFinishPayment] = useState(false);

  return (
    <UserTicketContext.Provider value={{ userTicket, setUserTicket, bookTicket, setBookTicket,
      finishTicket, setFinishTicket, finishSubscription, setFinishSubscription, selectedTicket, 
      setSelectedTicket, selectedAccommodation, setSelectedAccommodation, finishPayment, setFinishPayment }}>
      {children}
    </UserTicketContext.Provider>
  );
}

export { UserTicketContext,  UserTicketProvider };
