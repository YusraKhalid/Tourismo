import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Trips } from '../api/trips.js';
import Trip from './Trip.js';


// App component - represents the whole app
class App extends Component {

  renderTrips() {
    let filteredTrips = this.props.trips;
    /******* can be used for filtering
     * if (this.state.hideCompleted) {
      filteredTrips = filteredTrips.filter(trip => !trip.checked);
    }*/
    return filteredTrips.map((trip) => {
      //const currentUserId = this.props.currentUser && this.props.currentUser._id;
      //const showPrivateButton = trip.owner === currentUserId;

      return (
        <Trip
          key={trip._id}
          trip={trip}
          //showPrivateButton={showPrivateButton}
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
        //incompleteCount: Trips.find({ checked: { $ne: true } }).count(),
        trips: Trips.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),   
    };
  })(App);