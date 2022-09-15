import { createContext, useState } from 'react';

const UserFormContext = createContext();

function UserFormProvider({ children }) {
  const [userForm, setUserForm] = useState();
  const [usePayment, setUsePayment] = useState(false);

  return (
    <UserFormContext.Provider value={{ userForm, setUserForm, usePayment, setUsePayment }}>
      {children}
    </UserFormContext.Provider>
  );
}

export { UserFormContext, UserFormProvider };
