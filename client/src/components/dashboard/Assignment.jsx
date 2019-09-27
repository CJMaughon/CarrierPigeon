import React from 'react';
import PropTypes from 'prop-types';
import './Assignment.css';

const Assignment = ({ name, status, statusDate }) => {
    // TODO: Translate date?
    return (
        <div className="assignment-record">
            <p>{name}</p>
            <div className="assignment-status">
                <p>{status}</p>
                <p>{statusDate}</p>
            </div>
            <p>&gt;</p>
        </div>
    )
}

export default Assignment;