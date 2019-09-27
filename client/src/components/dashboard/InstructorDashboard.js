import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Assignment from './Assignment';
import TabContainer from './TabContainer';
const assignments = [
  {
    name: 'Task 1',
    status: 'Submitted',
    statusDate: '09/13/2019'
  },
  {
    name: 'Task 2',
    status: 'Overdue',
    statusDate: '09/26/2019'
  },
  {
    name: 'Task 3',
    status: 'Upcoming',
    statusDate: '01/25/2020'
  }
];

const InstructorDashboard = ({ logout, assigns }) => {
  const items = assignments.map(a => {
    return (
      <li key={a.name} className="assignment-item"><Assignment {...a} /></li>
    )
  });
  const headers = ['To Do', 'History'];
  const contents = [<ul>{items.filter(a => a.props.children.props.status !== 'Submitted')}</ul>, <ul>{items.filter(a => a.props.children.props.status === 'Submitted')}</ul>];
  const tabs = <TabContainer headers={headers} content={contents} />
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='large'>Instructor Dashboard</h1>
          {tabs}
          <button onClick={logout}>LOG OUT</button>
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
