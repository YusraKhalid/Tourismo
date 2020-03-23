import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { Trips } from '../api/trips.js';
import Trip from './Trip.js';


class IndividualTrip extends Component {

    constructor(props) {
        super(props);
    };

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
        return(
            <div className="container">
            <header>
            <h1>Trips</h1>
            <AccountsUIWrapper />
            </header>
            <ul>
              {this.renderTrips()}
            </ul>
          </div>
        );
    };
};

export default withTracker(() => {
    Meteor.subscribe('trips');
    return {
        trips: Trips.find({ _id: (window.location.pathname).match('[^/]*$')[0] }).fetch(),
        currentUser: Meteor.user(),   
    };
  })(IndividualTrip);