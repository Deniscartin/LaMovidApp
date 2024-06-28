import React from 'react';

const Filter = ({ filters, setFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mb-6 flex space-x-4">
      <select
        name="eventType"
        className="w-full px-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-1"
        value={filters.eventType}
        onChange={handleFilterChange}
      >
        <option value="">Tutti gli eventi</option>
        <option value="concerto">Concerto</option>
        <option value="festival">Festival</option>
        <option value="teatro">Teatro</option>
      </select>
      <select
        name="venue"
        className="w-full px-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-1"
        value={filters.venue}
        onChange={handleFilterChange}
      >
        <option value="">Tutti i luoghi</option>
        <option value="rockArena">Rock Arena</option>
        <option value="jazzClub">Jazz Club</option>
        <option value="piazzaCentrale">Piazza Centrale</option>
        <option value="anfiteatroRomano">Anfiteatro Romano</option>
      </select>
      <select
        name="location"
        className="w-full px-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-1"
        value={filters.location}
        onChange={handleFilterChange}
      >
        <option value="">Tutte le città</option>
        <option value="milano">Milano</option>
        <option value="roma">Roma</option>
        <option value="firenze">Firenze</option>
        <option value="verona">Verona</option>
      </select>
    </div>
  );
};

export default Filter;
