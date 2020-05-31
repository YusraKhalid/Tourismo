import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Trips } from '../api/trips.js';
import Trip from './Trip.js';


class App extends Component {

  renderTrips() {
    let filteredTrips = this.props.trips;
    return filteredTrips.map((trip) => {
      return (
        <Trip
          key={trip._id}
          trip={trip}
        />
      );
    });
  }

  render() {
    return (
      <div className="container">
        <header>
        <h1>Trips</h1>
        </header>
        <ul className='trips'>
          {this.renderTrips()}
        </ul>
      </div>
    );
    }
  }

  export default withTracker(() => {
    Meteor.subscribe('trips');
    return {
        trips: Trips.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),   
    };
  })(App);