import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, database } from '../../firebase';
import { ref, get, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    gender: '',
    numberOfPeople: '',
    name: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventRef = ref(database, `events/${id}`);
        const snapshot = await get(eventRef);
        if (snapshot.exists()) {
          setEvent(snapshot.val());
        } else {
          setEvent(null);
        }
      } catch (error) {
        console.error("Errore nel recuperare l'evento: ", error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleReservation = async () => {
    const reservationId = uuidv4();
    const reservationRef = ref(database, `ListaPrenotata/${reservationId}`);
    await set(reservationRef, {
      reservationId: reservationId, // Salva reservationId
      eventId: id,
      ...userData
    });

    // Aggiungi la prenotazione agli eventi prenotati dell'utente
    const user = auth.currentUser;
    if (user) {
      const userBookedEventsRef = ref(database, `users/${user.uid}/bookedEvents/${reservationId}`);
      await set(userBookedEventsRef, {
        reservationId: reservationId, // Salva reservationId
        eventId: id,
        price: event.prices.men.price, // Salva il prezzo nel bookedEvents dell'utente
        venueName: event.venueName, // Salva il nome del locale nel bookedEvents dell'utente
        ...userData
      });

      alert('Prenotazione effettuata con successo!');
      setIsModalOpen(false);
      setUserData({
        gender: '',
        numberOfPeople: '',
        name: '',
        phone: '',
        email: ''
      });
    } else {
      console.error('Utente non autenticato');
    }
  };

  if (loading) {
    return <div>Caricamento...</div>;
  }

  if (!event) {
    return <div>Evento non trovato</div>;
  }

  return (
    <div className="p-6 bg-gray-900 text-white h-screen shadow-lg pb-10">
      <h1 className="text-3xl font-extrabold mb-2">{event.venueName}</h1>
      <div className="mb-4">
        <p className="text-sm text-gray-400">Data:</p>
        <p className="text-lg">{event.date}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-400">Locale:</p>
        <p className="text-lg">{event.venueName}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-400">Indirizzo:</p>
        <p className="text-lg">{event.address}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-400">Genere di Musica:</p>
        <p className="text-lg">{event.musicGenre}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-400">Dress Code:</p>
        <p className="text-lg">{event.dressCode}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-400">Età Minima:</p>
        <p className="text-lg">{event.minAge}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Prezzi - Uomo</h3>
        <div className="mb-2">
          <p className="text-sm text-gray-400">Ingresso fino alle ore:</p>
          <p className="text-lg">{event.prices.men.entryUntil}</p>
        </div>
        <div className="mb-2">
          <p className="text-sm text-gray-400">Drink:</p>
          <p className="text-lg">{event.prices.men.drinkOption === "withDrink" ? "Con Drink" : "Senza Drink"}</p>
        </div>
        <div className="mb-2">
          <p className="text-sm text-gray-400">Prezzo:</p>
          <p className="text-lg">{event.prices.men.price}</p>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Prezzi - Donna</h3>
        <div className="mb-2">
          <p className="text-sm text-gray-400">Ingresso fino alle ore:</p>
          <p className="text-lg">{event.prices.women.entryUntil}</p>
        </div>
        <div className="mb-2">
          <p className="text-sm text-gray-400">Drink:</p>
          <p className="text-lg">{event.prices.women.drinkOption === "withDrink" ? "Con Drink" : "Senza Drink"}</p>
        </div>
        <div className="mb-2">
          <p className="text-sm text-gray-400">Prezzo:</p>
          <p className="text-lg">{event.prices.women.price}</p>
        </div>
      </div>
      <div className="mt-6 flex space-x-4">
        <button
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          onClick={() => setIsModalOpen(true)}
        >
          Mettiti in lista
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          Prenota il tavolo
        </button>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Dettagli della Prenotazione</h2>
            <div className="mb-4">
              <label className="block text-sm mb-2">Seleziona il genere:</label>
              <select
                name="gender"
                value={userData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded"
              >
                <option value="">Seleziona</option>
                <option value="men">Uomo</option>
                <option value="women">Donna</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Numero di persone:</label>
              <input
                type="number"
                name="numberOfPeople"
                value={userData.numberOfPeople}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Nome:</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Telefono:</label>
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Annulla
                </button>
                <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleReservation}
              >
                Prenota
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
