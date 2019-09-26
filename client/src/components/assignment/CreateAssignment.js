import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar'
import PropTypes from 'prop-types';
const CreateAssignment = ({ auth: { user } }) => {
    return (
        <section className='landing'>
            <Navbar />
            <div>
                <h1 className='large text-primary'>Create Assignment</h1>
                <Fragment>
                </Fragment>
            </div>
        </section >
    );
};

CreateAssignment.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(
    mapStateToProps,
    {}
)(CreateAssignment);
