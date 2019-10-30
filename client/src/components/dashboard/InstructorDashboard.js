import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Spinner from '../layout/Spinner';
import { getInstructorAssignments } from '../../actions/assignment';
import Assignment from './Assignment';
import TabContainer from './TabContainer';

const InstructorDashboard = ({ getInstructorAssignments, authLoading, assignmentItems, logout, loadingAssignment, auth: { user } }) => {
  useEffect(() => {
    if (user != null) {
      getInstructorAssignments(user._id);
    }
  }, [user]);

  function getTab(assignmentItems) {

    const todoItems = assignmentItems.filter(a => a.status !== 'Submitted').sort((a, b) => {
      return a.dueDate - b.dueDate;
    }).map(a => {
      return (
        <li key={a._id} className="assignment-item"><Assignment {...a} /></li>
      )
    });
    const historyItems = assignmentItems.filter(a => a.status === 'Submitted').sort((a, b) => {
      return a.dueDate - b.dueDate;
    }).map(a => {
      return (
        <li key={a._id} className="assignment-item"><Assignment {...a} /></li>
      )
    });
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
    const tabs = <TabContainer headers={tabStuff.map(t => t.header)} content={tabStuff.map(t => t.content)} />
    return tabs;
  }

  return (authLoading || loadingAssignment) ? (
    <Spinner />
  ) : (
      <section className='landing'>
        <div className='instructor-landing-inner'>
          <h1 className='large'>Instructor Dashboard</h1>
          {getTab(assignmentItems)}
          <button className='tab-header' onClick={logout}>LOG OUT</button>
        </div>
      </section>
    );
};


InstructorDashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  getInstructorAssignments: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  assignmentItems: state.assignment.assignments,
  loadingAssignment: state.assignment.loadingAssignment,
  authLoading: state.auth.loading
});

export default connect(
  mapStateToProps,
  { getInstructorAssignments, logout }
)(InstructorDashboard);
