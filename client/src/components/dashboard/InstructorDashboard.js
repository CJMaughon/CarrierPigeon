import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
const InstructorDashboard = ({ logout }) => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Instructor Dashboard</h1>
          <button onClick={logout}>LOG OUT</button>
        </div>
      </div>
    </section>
  );
};

InstructorDashboard.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(
  null,
  { logout }
)(InstructorDashboard);
