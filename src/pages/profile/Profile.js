import React, { useState, useEffect } from 'react';
import { auth, database } from '../../firebase';
import { ref, get } from 'firebase/database';
import { signOut } from 'firebase/auth';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Ottieni l'utente corrente
        const user = auth.currentUser;
        if (user) {
          // Ottieni i dati utente dal database
          const userRef = ref(database, `users/${user.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            console.error('Dati utente non trovati nel database');
          }
        } else {
          console.error('Utente non autenticato');
        }
      } catch (error) {
        console.error('Errore nel recupero dei dati utente:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Dopo il logout, reindirizza l'utente alla pagina di login o a una pagina desiderata
      window.location.href = '/login'; // Cambia '/login' con il percorso desiderato
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  if (loading) {
    return <div>Caricamento...</div>;
  }

  if (!userData) {
    return <div>Dati utente non trovati.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-white">Profilo Utente</h1>
      <div className="mb-4">
        <p className="block text-sm font-medium text-gray-300">Nome</p>
        <p className="text-lg text-white">{userData.firstName}</p>
      </div>
      <div className="mb-4">
        <p className="block text-sm font-medium text-gray-300">Cognome</p>
        <p className="text-lg text-white">{userData.lastName}</p>
      </div>
      <div className="mb-4">
        <p className="block text-sm font-medium text-gray-300">Numero di Telefono</p>
        <p className="text-lg text-white">{userData.phoneNumber}</p>
      </div>
      <div className="mb-4">
        <p className="block text-sm font-medium text-gray-300">Email</p>
        <p className="text-lg text-white">{userData.email}</p>
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
