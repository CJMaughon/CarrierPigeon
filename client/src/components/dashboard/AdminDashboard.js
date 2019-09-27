import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
const AdminDashboard = ({ logout }) => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Admin Dashboard</h1>
          <button onClick={logout}>LOG OUT</button>
        </div>
      </div>
    </section>
  );
};

AdminDashboard.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(
  null,
  { logout }
)(AdminDashboard);
