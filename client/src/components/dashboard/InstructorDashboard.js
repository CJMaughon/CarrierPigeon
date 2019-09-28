import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Assignment from './Assignment';
import TabContainer from './TabContainer';
const assignments = [
  {
    id: 0,
    name: 'Task 1',
    status: 'Submitted',
    statusDate: new Date(2019, 6, 25)
  },
  {
    id: 1, 
    name: 'Task 2',
    status: 'Submitted',
    statusDate: new Date(2019, 7, 25)
  },
  {
    id: 2,
    name: 'Task 3',
    status: 'Overdue',
    statusDate: new Date(2019, 8, 25)
  },
  {
    id: 3,
    name: 'Task 4',
    status: 'Upcoming',
    statusDate: new Date(2019, 9, 25)
  },
  {
    id: 4,
    name: 'Task 5',
    status: 'Upcoming',
    statusDate: new Date(2019, 10, 25)
  }
];

const InstructorDashboard = ({ logout, assigns }) => {
  const todoItems = assignments.filter(a => a.status !== 'Submitted').sort((a, b) => {
    return a.statusDate - b.statusDate;
  }).map(a => {
    return (
      <li key={a.id} className="assignment-item"><Assignment {...a} /></li>
    )
  });
  const historyItems = assignments.filter(a => a.status === 'Submitted').sort((a, b) => {
    return a.statusDate - b.statusDate;
  }).map(a => {
    return (
      <li key={a.name} className="assignment-item"><Assignment {...a} /></li>
    )
  });
  //const headers = ['To Do', 'History'];
  const tabStuff = [
    {
      header: 'To Do',
      content: todoItems
    },
    {
      header: 'History',
      content: historyItems
    }
  ];
  //const contents = [<ul>{todoItems}</ul>, <ul>{historyItems}</ul>];
  const tabs = <TabContainer headers={tabStuff.map(t => t.header)} content={tabStuff.map(t => t.content)} />
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='large'>Instructor Dashboard</h1>
          {tabs}
          <button className='tab-header' onClick={logout}>LOG OUT</button>
        </div>
      </div>
    </section>
  );
};

InstructorDashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  assigns: PropTypes.array,
};

InstructorDashboard.defaultProps = {
  assigns: [],
};

export default connect(
  null,
  { logout }
)(InstructorDashboard);
