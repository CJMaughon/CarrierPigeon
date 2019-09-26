import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar'
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
const AdminDashboard = ({ logout }) => {
  return (
    <section className='landing'>
      <Navbar />
      <div>
        <h1 className='x-large'>Admin Dashboard</h1>
        <button onClick={logout}>LOG OUT</button>
      </div>
    </section >
  );
};

AdminDashboard.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(
  null,
  { logout }
)(AdminDashboard);
