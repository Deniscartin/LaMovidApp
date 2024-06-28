import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faBookmark, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white fixed bottom-0 left-0 right-0 flex justify-around p-4 z-50">
      <Link to="/" className="flex flex-col items-center">
        <FontAwesomeIcon icon={faHome} size="lg" />
        <span className="text-xs">Home</span>
      </Link>
      <Link to="/favorites" className="flex flex-col items-center">
        <FontAwesomeIcon icon={faHeart} size="lg" />
        <span className="text-xs">Preferiti</span>
      </Link>
      <Link to="/booked" className="flex flex-col items-center">
        <FontAwesomeIcon icon={faBookmark} size="lg" />
        <span className="text-xs">Prenotati</span>
      </Link>
    
      <Link to="/profile" className="flex flex-col items-center">
      <FontAwesomeIcon icon={faUser} size="lg" />
        <span className="text-xs">Profilo</span>
      </Link>
    </div>
  );
};

export default Navbar;
