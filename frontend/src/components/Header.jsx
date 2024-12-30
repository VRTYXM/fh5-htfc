import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import logoSvg from '../assets/img/logo.svg';
import { useDispatch } from 'react-redux';
import { resetFilters } from '../redux/slices/filterSlice';

function Header() {
  const dispatch = useDispatch();

  const setFiltersDefault = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div onClick={setFiltersDefault} className="header__logo">
            <img src={logoSvg} alt="Hard-to-Find Collector Logo" />
            <h1>Hard-to-Find Helper</h1>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
