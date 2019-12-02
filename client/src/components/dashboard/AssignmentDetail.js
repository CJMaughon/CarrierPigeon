import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSubmissions } from '../../actions/submission';
const AssignmentDetail = ({ loadingSubmission, submissionItems, getSubmissions, match, auth: { user } }) => {
    useEffect(() => {
        getSubmissions(match.params.id);
    }, [getSubmissions]);

    return (
        <section className='landing'>
            <h1 className='x-medium'>{match.params.id}</h1>
        </section>
    );
};

AssignmentDetail.propTypes = {
    getSubmissions: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    submissionItems: state.submission.submissions,
    loadingSubmission: state.submission.loadingSubmissions,
});
export default connect(
    mapStateToProps,
    { getSubmissions }
)(AssignmentDetail);
