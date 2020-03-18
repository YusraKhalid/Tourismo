import React from 'react';
import ReactDOM from "react-dom";

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from "history";
import App from '../imports/ui/App.js';
import Customer from '../imports/ui/Customer.js';
const history = createBrowserHistory();
const routing = (
  <Router history={history}>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/Customer" component={Customer} />
    </div>
  </Router>
)


  ReactDOM.render(routing,document.getElementById('render-target')
  	);
