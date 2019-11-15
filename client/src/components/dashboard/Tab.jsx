import React from 'react';
import './Tab.css';

const Tab = ({ children, isShown }) => {
    return (
        <div className={`dash-tab ${isShown ? 'dash-tab-shown' : ''}`}>
            {children}
        </div>
    )
};

export default Tab;