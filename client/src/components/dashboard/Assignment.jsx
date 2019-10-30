import React from 'react';
import './Assignment.css';

const formatDate = date => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getYear() + 1900}`;
}

const Assignment = ({ name, status, dueDate }) => {
    return (
        <div className="assignment-record">
            <div className="assignment-name">
                <p>{name}</p>
                <div>
                    <div className={`assignment-status ${"status-" + status.toLowerCase()}`}>
                        {status}
                    </div>
                    <div className="assignment-date">
                        <i className="fa fa-clock-o" aria-hidden="true"></i>{formatDate(new Date(dueDate))}
                    </div>
                </div>
            </div>
            <p>&gt;</p>
        </div >
    )
}


export default Assignment;