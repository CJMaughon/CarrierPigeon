import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from '../layout/Landing';
import NotFound from '../layout/NotFound';
import AdminDashboard from '../dashboard/AdminDashboard';
import InstructorDashboard from '../dashboard/InstructorDashboard';
import UnapprovedUserPage from '../dashboard/UnapprovedUserPage';
import PrivateRoute from '../routing/PrivateRoute';
const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/admin_dashboard' component={AdminDashboard} />
        <PrivateRoute exact path='/instructor_dashboard' component={InstructorDashboard} />
        <PrivateRoute exact path='/unapproved_page' component={UnapprovedUserPage} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
