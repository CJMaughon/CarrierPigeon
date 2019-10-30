import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from '../layout/Landing';
import UserApproveForm from '../layout/UserApprove';
import NotFound from '../layout/NotFound';
import CreateAssignment from '../assignment/CreateAssignment';
import AssignmentInfoForm from '../assignment/AssignmentInfoForm';
import AdminDashboard from '../dashboard/AdminDashboard';
import InstructorDashboard from '../dashboard/InstructorDashboard';
import UnapprovedUserPage from '../dashboard/UnapprovedUserPage';
import PrivateRoute from '../routing/PrivateRoute';
const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/' component={Landing} />
        <PrivateRoute exact path='/admin_dashboard' component={AdminDashboard} />
        <PrivateRoute exact path='/approve_user' component={UserApproveForm} />
        <PrivateRoute exact path='/create_assignment' component={CreateAssignment} />
        <PrivateRoute exact path='/edit_assignment_info' component={AssignmentInfoForm} />
        <PrivateRoute exact path='/instructor_dashboard' component={InstructorDashboard} />
        <PrivateRoute exact path='/unapproved_page' component={UnapprovedUserPage} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
