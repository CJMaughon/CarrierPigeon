import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
const UnapprovedUserPage = ({ logout }) => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-medium'>YOUR ACCOUNT IS BEING REVIEWED BY THE ADMINISTRATOR. PLEASE TRY AGAIN LATER!</h1>
          <button onClick={logout}>GO BACK TO HOME PAGE</button>
        </div>
      </div>
    </section>
  );
};

UnapprovedUserPage.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(
  null,
  { logout }
)(UnapprovedUserPage);
