import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import logoSvg from '../assets/img/logo.svg';

function Header() {
  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="40" src={logoSvg} alt="Hard-to-Find Collector Logo" />
            <h1>Hard-to-Find Helper</h1>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
