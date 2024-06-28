import React, { useEffect, useState } from 'react';
import { auth, database } from '../../firebase';
import { ref, get } from 'firebase/database';
import BookedCard from './BookedCard';

const Booked = () => {
  const [bookedEvents, setBookedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookedEvents = async () => {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const bookedEventsRef = ref(database, `users/${userId}/bookedEvents`);

        get(bookedEventsRef).then((snapshot) => {
          const bookedEventsData = snapshot.val();
          if (bookedEventsData) {
            const eventsIds = Object.keys(bookedEventsData);
            const eventsPromises = eventsIds.map((eventId) =>
              get(ref(database, `events/${eventId}`)).then((eventSnapshot) => ({
                id: eventId,
                ...bookedEventsData[eventId],
                ...eventSnapshot.val()
              }))
            );

            Promise.all(eventsPromises)
              .then((eventsInfo) => {
                setBookedEvents(eventsInfo);
              })
              .catch((error) => {
                console.error('Errore nel recuperare le informazioni degli eventi:', error);
                setBookedEvents([]);
              });
          } else {
            setBookedEvents([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Errore nel recuperare gli eventi prenotati:', error);
          setLoading(false);
        });
      } else {
        console.error('Utente non autenticato');
        setLoading(false);
      }
    };

    fetchBookedEvents();
  }, []);

  const handleDelete = (reservationId) => {
    setBookedEvents((prevEvents) => prevEvents.filter(event => event.reservationId !== reservationId));
  };

  if (loading) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="p-4">
      {bookedEvents.length > 0 ? (
        bookedEvents.map((event) => (
          <BookedCard key={event.reservationId} event={{ ...event, reservationId: event.reservationId }} onDelete={handleDelete} />
        ))
      ) : (
        <p>Non hai prenotato nessun evento.</p>
      )}
    </div>
  );
};

export default Booked;
