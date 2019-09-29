import React from 'react';
import PropTypes from 'prop-types';
import './Assignment.css';
import { format } from 'url';

const formatDate = date => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getYear() + 1900}`;
}

const Assignment = ({ name, status, statusDate }) => {
    // TODO: Translate date?
    return (
        <div className="assignment-record">
            <p>{name}</p>
            <div className="assignment-status">
                <p>{status}</p>
                <p>{formatDate(statusDate)}</p>
            </div>
            <p>&gt;</p>
        </div>
    )
}

export default Assignment;