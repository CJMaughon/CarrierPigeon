import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ error }) =>
  error !== null && <div className='error-text'>{error}</div>;

Alert.propTypes = {
  error: PropTypes.string
};

const mapStateToProps = state => ({
  error: state.auth.error
});

export default connect(mapStateToProps)(Alert);
