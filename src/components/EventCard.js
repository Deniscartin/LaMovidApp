import React, { useState, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar, faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { AuthContext } from '../App';
import { getDatabase, ref, update } from 'firebase/database';

const EventCard = ({ event }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const db = getDatabase();

  // Callback memorizzata per gestire il toggle dei preferiti
  const toggleFavorite = useCallback(() => {
    setIsFavorite(prev => !prev);

    // Ottieni l'ID dell'utente corrente dal contesto di autenticazione
    const userId = isLoggedIn ? isLoggedIn.uid : null;
    if (!userId) return;

    // Aggiorna il nodo dei preferiti nel database Firebase
    const userRef = ref(db, `users/${userId}/favorites/${event.id}`);
    update(userRef, {
      isFavorite: !isFavorite,
      eventDetails: {
        venueName: event.venueName,
        date: event.date,
        address: event.address,
        musicGenre: event.musicGenre,
        minAge: event.minAge
      }
    }).then(() => {
      console.log('Aggiornamento dei preferiti avvenuto con successo.');
    }).catch((error) => {
      console.error('Errore durante l\'aggiornamento dei preferiti:', error);
    });

  }, [db, event.id, event, isLoggedIn, isFavorite]);

  return (
    <div className="bg-gray-900 text-white shadow-lg rounded-lg p-6 mb-6 transition transform">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-extrabold mb-1">{event.venueName}</h2>
          <p className="text-sm text-gray-400">{event.date}</p>
          <p className="text-sm text-gray-400">{event.address}</p>
          <p className="text-sm text-gray-400">{event.musicGenre}</p>
          <p className="text-sm text-gray-400">Minima età: {event.minAge}</p>
        </div>
        {/* <button
          onClick={toggleFavorite}
          className="text-yellow-500 focus:outline-none"
          aria-label={isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
        >
          <FontAwesomeIcon icon={isFavorite ? solidStar : regularStar} size="lg" />
        </button> */}
      </div>
      <Link to={`/event/${event.id}`}>
        <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition">
          Maggiori dettagli
        </button>
      </Link>
    </div>
  );
};

export default EventCard;
