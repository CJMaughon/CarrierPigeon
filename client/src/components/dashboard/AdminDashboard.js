import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar'
import PropTypes from 'prop-types';
const AdminDashboard = ({ auth: { user } }) => {
  return (
    <section className='landing'>
      <Navbar />
      <div>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Welcome {user && user.name}
        </p>
        <Fragment>
          <Link to='/create_assignment' className='btn btn-primary my-1'>
            Create Assignment
          </Link>
        </Fragment>

      </div>
    </section >
  );
};

AdminDashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  {}
)(AdminDashboard);
