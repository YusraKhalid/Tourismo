import React from 'react';
import ReactDOM from "react-dom";

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from "history";
import App from '../imports/ui/App.js';
import DisplayTrips from '../imports/ui/DisplayTrips.js';
import Home from '../imports/ui/Home.js'
import IndividualTrip from '../imports/ui/IndividualTrip.js';
import TourGuide from '../imports/ui/TourGuide.js';
import BookGuide from '../imports/ui/BookGuide.js';
import TripCompany from '../imports/ui/TripCompany.js';

const history = createBrowserHistory();
const routing = (
  <Router history={history}>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/AddTrips" component={App} />
      <Route exact path="/DisplayTrips" component={DisplayTrips} />
      <Route exact path="/IndividualTrip*" component={IndividualTrip} />
      <Route exact path="/TourGuide" component={TourGuide} />
      <Route exact path="/BookGuide" component={BookGuide} />
      <Route exact path="/TripCompany" component={TripCompany} />

    </div>
  </Router>
)


  ReactDOM.render(routing,document.getElementById('render-target')
  	);
