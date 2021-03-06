import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './components/routing/Routes';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import './App.css';
import { loadUser } from './actions/auth';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Provider store={store}>
        <Router>
          <Fragment>
            <Switch>
              <Route component={Routes} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    </MuiPickersUtilsProvider>
  );
};

export default App;
