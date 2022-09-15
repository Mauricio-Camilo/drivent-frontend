import { createContext, useState } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const UserTicketContext = createContext();

function UserTicketProvider({ children }) {
  const [userTicket, setUserTicket] = useLocalStorage('userTicket', undefined);
  const [bookTicket, setBookTicket] = useState(false);
  const [finishTicket, setFinishTicket] = useState(false);

  return (
    <UserTicketContext.Provider value={{ userTicket, setUserTicket, bookTicket, setBookTicket,
      finishTicket, setFinishTicket }}>
      {children}
    </UserTicketContext.Provider>
  );
}

export { UserTicketContext,  UserTicketProvider };
