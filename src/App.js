import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Countdown from './pages/Countdown';
import Enroll from './pages/Enroll';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import FillSubscription from './pages/Dashboard/FillSubscription';
import Payment from './pages/Dashboard/Payment';
import Payment2 from './pages/Dashboard/Payment2';
import Hotel from './pages/Dashboard/Hotel';
import Activities from './pages/Dashboard/Activities';
import Certificate from './pages/Dashboard/Certificate';

import { EventInfoProvider } from './contexts/EventInfoContext';
import { UserProvider } from './contexts/UserContext';
import { UserTicketProvider } from './contexts/UserTicketContext';
import { UserHotelProvider } from './contexts/UserHotelContext';
import { UserActivitiesProvider } from './contexts/ActivitiesContext';

import useToken from './hooks/useToken';

import PrivateRoute from './components/PrivateRoute';
import { UserFormProvider } from './contexts/UserFormContext';
import { UserPaymentProvider } from './contexts/ConfirmUserPayment';

export default function App() {
  return (
    <>
      <ToastContainer />
      <EventInfoProvider>
        <UserProvider>
          <UserFormProvider>
            <UserTicketProvider>
              <UserHotelProvider>
                <UserPaymentProvider>
                  <UserActivitiesProvider>
                    <Router>
                      <Routes>
                        <Route path="/" element={<Countdown />} />
                        <Route path="/enroll" element={<Enroll />} />
                        <Route path="/sign-in" element={<SignIn />} />

                        <Route
                          path="/dashboard"
                          element={
                            <ProtectedRouteGuard>
                              <Dashboard />
                            </ProtectedRouteGuard>
                          }
                        >
                          <Route path="subscription" element={<FillSubscription />} />
                          <Route path="payment" element={<Payment />} />
                          <Route
                            path="hotel"
                            element={
                              <PrivateRoute>
                                <Hotel />
                              </PrivateRoute>
                            }
                          />
                          <Route
                            path="payment2"
                            element={
                              <PrivateRoute>
                                <Payment2 />
                              </PrivateRoute>
                            }
                          />
                          <Route
                            path="activities"
                            element={
                              <PrivateRoute>
                                <Activities />
                              </PrivateRoute>
                            }
                          />
                          <Route
                            path="certificate"
                            element={
                              <PrivateRoute>
                                <Certificate />
                              </PrivateRoute>
                            }
                          />
                          <Route index path="*" element={<Navigate to="/dashboard/subscription" />} />
                        </Route>
                      </Routes>
                    </Router>
                  </UserActivitiesProvider>
                </UserPaymentProvider>
              </UserHotelProvider>
            </UserTicketProvider>
          </UserFormProvider>
        </UserProvider>
      </EventInfoProvider>
    </>
  );
}

function ProtectedRouteGuard({ children }) {
  const token = useToken();

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return <>
    {children}
  </>;
}
