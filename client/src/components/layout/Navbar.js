import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {

  const signin = (
    <ul>
      <li>
        <i className="fas fa-sign-in" />
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/aboutUs">About Us</Link>
      </li>
    </ul>
  );
  const signout = (
    <ul>
      
      <li>
        { user && user.userType == "dogWalker" &&
          <Link to="/walkerProfile">
            <i className="fas fa-bell" />
            <span>Profile</span>
          </Link>
        }
        { user && user.userType == "dogOwner" &&
          <Link to="/dogProfile">
            <i className="fas fa-bell" />
            <span>Add Dog Profile</span>
          </Link>
        }
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm">Logout</span>
        </a>
      </li>
      <li>
        <Link to="/aboutUs">About Us</Link>
      </li>
    </ul >
  );

  return (
    <nav className="navbar">
      <h1>
        <Link to="/">
          <img className="icon" src="doc.jpg" />
          <span>Home</span>
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? signout : signin}</Fragment>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
