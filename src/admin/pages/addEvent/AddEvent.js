import React, { useState } from 'react';
import { database } from '../../../firebase';
import { ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    id: uuidv4(),
    venueName: '',
    date: '',
    address: '',
    musicGenre: '',
    dressCode: '',
    minAge: '',
    prices: {
      men: {
        entryUntil: '',
        withDrink: '',
        price: '',
      },
      women: {
        entryUntil: '',
        withDrink: '',
        price: '',
      }
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleNestedChange = (e, category, subcategory) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      prices: {
        ...prevState.prices,
        [category]: {
          ...prevState.prices[category],
          [subcategory]: value,
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    set(ref(database, 'events/' + eventData.id), eventData)
      .then(() => {
        alert('Evento aggiunto con successo!');
        setEventData({
          id: uuidv4(),
          venueName: '',
          date: '',
          address: '',
          musicGenre: '',
          dressCode: '',
          minAge: '',
          prices: {
            men: {
              entryUntil: '',
              withDrink: '',
              price: '',
            },
            women: {
              entryUntil: '',
              withDrink: '',
              price: '',
            }
          }
        });
      })
      .catch((error) => {
        console.error('Errore nell\'aggiunta dell\'evento: ', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Aggiungi Evento</h2>
      <div className="mb-4">
        <label className="block text-lg mb-2">Nome Locale</label>
        <input
          type="text"
          name="venueName"
          value={eventData.venueName}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Data</label>
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Indirizzo</label>
        <input
          type="text"
          name="address"
          value={eventData.address}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Genere di Musica</label>
        <input
          type="text"
          name="musicGenre"
          value={eventData.musicGenre}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Dress Code</label>
        <select
          name="dressCode"
          value={eventData.dressCode}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded"
          required
        >
          <option value="">Seleziona</option>
          <option value="curato">Curato</option>
          <option value="comeAsYouAre">Come as you are</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Età Minima</label>
        <input
          type="number"
          name="minAge"
          value={eventData.minAge}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded"
          required
        />
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Prezzi - Uomo</h3>
        <div className="mb-2">
          <label className="block text-lg mb-2">Ingresso fino alle ore</label>
          <input
            type="time"
            name="entryUntil"
            value={eventData.prices.men.entryUntil}
            onChange={(e) => handleNestedChange(e, 'men', 'entryUntil')}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-lg mb-2">Drink</label>
          <select
            name="drinkOption"
            value={eventData.prices.men.drinkOption}
            onChange={(e) => handleNestedChange(e, 'men', 'drinkOption')}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded"
            required
          >
            <option value="">Seleziona</option>
            <option value="withDrink">Con Drink</option>
            <option value="withoutDrink">Senza Drink</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-lg mb-2">Prezzo</label>
          <input
            type="number"
            name="price"
            value={eventData.prices.men.price}
            onChange={(e) => handleNestedChange(e, 'men', 'price')}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Prezzi - Donna</h3>
        <div className="mb-2">
          <label className="block text-lg mb-2">Ingresso fino alle ore</label>
          <input
            type="time"
            name="entryUntil"
            value={eventData.prices.women.entryUntil}
            onChange={(e) => handleNestedChange(e, 'women', 'entryUntil')}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-lg mb-2">Drink</label>
          <select
            name="drinkOption"
            value={eventData.prices.women.drinkOption}
            onChange={(e) => handleNestedChange(e, 'women', 'drinkOption')}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded"
            required
          >
            <option value="">Seleziona</option>
            <option value="withDrink">Con Drink</option>
            <option value="withoutDrink">Senza Drink</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-lg mb-2">Prezzo</label>
          <input
            type="number"
            name="price"
            value={eventData.prices.women.price}
            onChange={(e) => handleNestedChange(e, 'women', 'price')}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded"
            required
          />
        </div>
      </div>
      <button type="submit" className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Aggiungi Evento</button>
    </form>
  );
};

export default AddEvent;
