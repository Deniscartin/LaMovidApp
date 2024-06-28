import React, { useState, useEffect } from 'react';
import { database } from '../../firebase';  // Importa il database da Firebase
import { ref, onValue } from 'firebase/database';
import EventCard from '../../components/EventCard';
import Search from '../../components/Search';
import Filter from '../../components/Filter';

const Home = ({ toggleBooked, toggleFavorite }) => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    eventType: "",
    venue: "",
    location: "",
  });

  useEffect(() => {
    // Recupera i dati dal database Firebase
    const eventsRef = ref(database, 'events');
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedEvents = [];
      for (const id in data) {
        loadedEvents.push({
          id,
          ...data[id]
        });
      }
      setEvents(loadedEvents);
    });
  }, []);

  const filteredEvents = events.filter((event) => {
    return (
      event.venueName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filters.eventType ? event.musicGenre === filters.eventType : true) &&
      (filters.venue ? event.venueName === filters.venue : true) &&
      (filters.location ? event.address.toLowerCase().includes(filters.location.toLowerCase()) : true)
    );
  });

  return (
    <div className="p-4 h-full bg-gray-900">
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Filter filters={filters} setFilters={setFilters} />
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            toggleBooked={toggleBooked}
            toggleFavorite={toggleFavorite}
          />
        ))
      ) : (
        <p className="text-white">Nessun evento trovato.</p>
      )}
    </div>
  );
};

export default Home;
