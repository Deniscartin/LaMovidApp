// App.js

import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import EventDetail from './pages/eventDetail/EventDetail';
import Booked from './pages/booked/Booked';
import Favorites from './pages/favorites/Favorites';
import Home from './pages/home/Home';
import Navbar from './components/Navbar';
import AdminBar from './admin/components/Adminbar';
import AddEvent from './admin/pages/addEvent/AddEvent';
import Register from './pages/userAuth/Register';
import Login from './pages/userAuth/Login';
import Profile from './pages/profile/Profile';
import { app, auth } from './firebase';
import { getDatabase, ref, onValue } from 'firebase/database';

// Crea il contesto di autenticazione
export const AuthContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user); // true se l'utente è autenticato, false altrimenti
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, isLoading }}>
      <Router>

        <Navbar />
        <div className="bg-gray-900 h-full pb-10"> {/* Aggiunto h-full per l'altezza completa */}
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
            <Route path="/aggiungievento" element={<AddEvent />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/booked" element={<ProtectedRoute component={Booked} />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>

      </Router>
    </AuthContext.Provider>
  );
}

// Componente ProtectedRoute
const ProtectedRoute = ({ component: Component, requiredUserType, ...rest }) => {
  const { isLoggedIn, userType, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn || (requiredUserType && userType !== requiredUserType)) {
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

export default App;
