import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
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
      const trip = this.props.trips[0]
        return(
            <div className="container">
            <header>
            <h1>Trips</h1>
            </header>
            <ul className='trips'>
              {trip ? <div>
              <a href={'../Company/'+trip.owner}>{trip.company}</a>
              </div>:""}
              {this.renderTrips()}
              {trip ? trip.detail:""}
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