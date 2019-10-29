import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/admin_dashboard'>
          <i className='fas fa-paste' />{' '}
          <span className='hide-sm'>Manage Assignments</span>
        </Link>
      </li>
      <li>
        <Link to='/approve_user'>
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'>Approve Users</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='./'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-dove' /> Carrier Pigeon
        </Link>
      </h1>
      {!loading && (
        <Fragment>{authLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
