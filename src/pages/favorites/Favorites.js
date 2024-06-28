import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../App';
import { getDatabase, ref, onValue } from 'firebase/database';
import EventCard from '../../components/EventCard';

const Favorites = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const db = getDatabase();

  useEffect(() => {
    const userId = isLoggedIn ? isLoggedIn.uid : null;
    if (!userId) return;

    const userFavoritesRef = ref(db, `users/${userId}/favorites`);
    onValue(userFavoritesRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const favoritesArray = Object.values(data).filter(item => item.isFavorite);
        setFavoriteEvents(favoritesArray);
      } else {
        setFavoriteEvents([]);
      }
    });

    // Clean-up
    return () => {
      // Detach the listener when component unmounts
      // to prevent memory leaks and unexpected behavior
      setFavoriteEvents([]);
    };
  }, [db, isLoggedIn]);

  return (
    <div className="bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">I Miei Preferiti</h1>
      {favoriteEvents.length === 0 ? (
        <p className="text-xl">Nessun evento nei preferiti.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteEvents.map(event => (
            <EventCard key={event.eventId} event={event.eventDetails} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
