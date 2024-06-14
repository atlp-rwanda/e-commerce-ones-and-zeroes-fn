import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.scss';

interface NavbarState {
  clicked: boolean;
}

class Navbar extends Component<{}, NavbarState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  toggleMenu = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <header>
        <nav>
          <div className="logo">
            <Link to="/">
              <img
                src="https://www.logomaker.com/api/main/images/1j_ojFVGOMkX9W_reBe4hGfW0KPDt0YRzAWngnw0KSYV9wIZw39w26cppqgtdkRU7FAPhhEHd8U5jjI7CNQYjAw7qniAOJ0GBSc...i38JVu4GHHYpehbWHujK8Qhpnt9h3c0P7BueBX6hC3KbdNk5MITMxah4C49ppG...NPjY6uWd3XrdQMpbWBZRsgJeoSLVU5m3CGc1XcrTRRN...zHGAc"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="hamburger" onClick={this.toggleMenu}>
            <i className="fa-solid fa-bars"></i>
          </div>
          <ul className={this.state.clicked ? 'menu open' : 'menu'}>
            <li><Link to="/" onClick={() => this.setState({ clicked: false })}>Home</Link></li>
            <li><Link to="/shop" onClick={() => this.setState({ clicked: false })}>Shop</Link></li>
            <li><Link to="/pages" onClick={() => this.setState({ clicked: false })}>Pages</Link></li>
            <li>
              <i className="fa-solid fa-cart-shopping"></i>
              <Link to="/cart" onClick={() => this.setState({ clicked: false })}>Cart</Link>
            </li>
            <li>
              <i className="fa-solid fa-user"></i>
              <Link to="/login" onClick={() => this.setState({ clicked: false })}>Login</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Navbar;
