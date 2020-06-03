
import React from 'react';
import { Router, Route, Switch } from 'react-router';
import {createBrowserHistory} from 'history';

import DisplayTrips from '../ui/DisplayTrips.js';
import Home from '../ui/Home.js'
import IndividualTrip from '../ui/IndividualTrip.js';
import TourGuide from '../ui/TourGuide.js';
import BookGuide from '../ui/BookGuide.js';
import TripCompany from '../ui/TripCompany';
import Company from '../ui/Company';
import Signup from '../ui/Signup';
import Login from '../ui/Login';
import Account from '../ui/Account.js';
import SignupGuide from '../ui/SignupGuide.js';
import SignupCustomer from '../ui/SignupCustomer.js';
import SignupCompany from '../ui/SignupCompany.js';
import Index from '../ui/index.js'


const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    {/* <div>
      <Account />
    </div> */}
    <div className='route-render'>
    {/* <section class="d-block ftco-img-flaticon"> */}
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="*/DisplayTrips" component={DisplayTrips} />
      <Route exact path="/IndividualTrip*" component={IndividualTrip} />
      <Route exact path="*/TourGuide" component={TourGuide} />
      <Route exact path="*/BookGuide" component={BookGuide} />
      <Route exact path="*/TripCompany" component={TripCompany} />
      <Route exact path="*/Signup" component={Signup} />
      <Route exact path="*/Login" component={Login} />
      <Route exact path="*/SignupCustomer" component={SignupCustomer} />
      <Route exact path="*/SignupGuide" component={SignupGuide} />
      <Route exact path="*/SignupCompany" component={SignupCompany} />
      <Route exact path="/Company*" component={Company} />
      <Route exact path="/index" component={Index} />
    </Switch>
    {/* </section> */}
    </div>
  </Router>
);

