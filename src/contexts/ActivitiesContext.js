import { createContext, useState } from 'react';

const UserActivitiesContext = createContext();

function UserActivitiesProvider({ children }) {
  const [selectedActivity, setSelectedActivity] = useState(new Map());

  return (
    <UserActivitiesContext.Provider value={{ selectedActivity, setSelectedActivity }}>
      {children}
    </UserActivitiesContext.Provider>
  );
}

export { UserActivitiesContext, UserActivitiesProvider };
