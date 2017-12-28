import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends PureComponent {
  render() {
    const { pathname } = this.props.location;

    const isHome = pathname === '/';
    const isJustAnotherPage = pathname === '/page';
    const isLoginPage = pathname === '/login';
    const righty = {float: 'right'};

    return (
      <header className="globalHeader">
        <ul>
          <li className={!isHome ? 'active' : ''}>
            {
              isHome ?
                'Home' : <Link to="/">Home</Link>

            }
          </li>
          {
            !isLoginPage &&
              <li className={!isJustAnotherPage ? 'active' : ''} style={righty}>
                {
                  isJustAnotherPage ?
                    'Just Another Page' : <Link to="/page">Выйти</Link>
                }
              </li>
          }
        </ul>
      </header>
    );
  }
}

export default Header;
