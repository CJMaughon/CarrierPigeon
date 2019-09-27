import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Error = ({ error }) =>
  error !== null && <div className='error-text'>{error}</div>;

Error.propTypes = {
  error: PropTypes.string
};

const mapStateToProps = state => ({
  error: state.auth.error
});

export default connect(mapStateToProps)(Error);
