import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserFormContext } from '../../contexts/UserFormContext';
import { UserTicketContext } from '../../contexts/UserTicketContext';

const PrivateRoute = ({ children }) => {
  const { finishTicket } = useContext(UserTicketContext);
  const { setUserForm } = useContext(UserFormContext);

  if (!setUserForm) {
    return <Navigate to="/dashboard/subscription" />;
  }
  
  return <>
    {children}
  </>;
};

export default PrivateRoute;
