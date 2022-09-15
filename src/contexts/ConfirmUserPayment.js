import { createContext, useState } from 'react';

const UserPaymentContext = createContext();

function UserPaymentProvider({ children }) {
  const [userPayment, setUserPayment] = useState(false);
  const [reservationData, setReservationData] = useState({});
  const [ticketInDb, setTicketInDb] = useState({ boolean: false, response: null });

  return (
    <UserPaymentContext.Provider value={{ userPayment, setUserPayment, reservationData, setReservationData, ticketInDb, setTicketInDb }}>
      {children}
    </UserPaymentContext.Provider>
  );
}

export { UserPaymentContext, UserPaymentProvider };
