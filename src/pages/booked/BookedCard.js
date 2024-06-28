import React from 'react';
import { Link } from 'react-router-dom';
import { ref, remove } from 'firebase/database';
import { database, auth } from '../../firebase';

const BookedCard = ({ event, onDelete }) => {
  const { name, numberOfPeople, price, venueName, eventId, reservationId } = event;

  const handleDelete = async () => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const eventRef = ref(database, `users/${userId}/bookedEvents/${reservationId}`);
      const AminEventRef = ref(database, `ListaPrenotata/${reservationId}`);
      console.log('Deleting event with ID:', reservationId); // Debug logging
  
      try {
        await remove(eventRef);
        await remove(AminEventRef); // Remove from ListaPrenotata as well
        console.log('Event deleted successfully'); // Debug logging
        onDelete(reservationId); // Call the onDelete function passed as a prop
  
      } catch (error) {
        console.error('Errore durante l\'eliminazione della prenotazione:', error);
      }
    } else {
      console.error('Utente non autenticato');
    }
  };
  

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="mb-2">
        <p className="text-lg font-semibold">{name}</p>
      </div>
      <div className="mb-2">
        <p>Numero di persone: {numberOfPeople}</p>
      </div>
      <div className="mb-2">
        <p>Prezzo per persona: {price}</p>
      </div>
      <div className="mb-2">
        <p>Nome locale: {venueName}</p>
      </div>
      <div className="flex space-x-2">
        <Link to={`/event/${eventId}`} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Dettagli Evento
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Elimina Prenotazione
        </button>
      </div>
    </div>
  );
};

export default BookedCard;
