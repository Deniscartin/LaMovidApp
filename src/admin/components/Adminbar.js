import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const AdminBar = () => {
  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <Link to="/admin/dashboard" className="flex items-center space-x-2 text-lg hover:text-blue-500 transition">
              <FontAwesomeIcon icon={faTachometerAlt} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/booked-users" className="flex items-center space-x-2 text-lg hover:text-blue-500 transition">
              <FontAwesomeIcon icon={faUsers} />
              <span>Booked Users</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/events" className="flex items-center space-x-2 text-lg hover:text-blue-500 transition">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>Events</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/venues" className="flex items-center space-x-2 text-lg hover:text-blue-500 transition">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>Venues</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminBar;
