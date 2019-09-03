import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './components/layout/Landing';
const App = () => (
  <Router>
    <Fragment>
      <Route exact path='/' component={Landing} />
    </Fragment>
  </Router>
);

export default App;
