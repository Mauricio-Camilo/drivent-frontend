import { createContext, useState } from 'react';

const UserSubscriptionContext = createContext();

function SubscriptionProvider({ children }) {
  const [finishSubscription, setFinishSubscription] = useState(false);

  return (
    <UserSubscriptionContext.Provider value={{ finishSubscription, setFinishSubscription }}>
      {children}
    </UserSubscriptionContext.Provider>
  );
}

export { UserSubscriptionContext,  SubscriptionProvider };
