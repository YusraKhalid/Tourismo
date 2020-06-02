import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Trips, UserTripBookings } from '../api/trips.js';
import Trip from './Trip.js';
import { render } from 'react-dom';
import Account from './Account';



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

  renderBookings(){
    const bookings = this.props.userBookings;
    return bookings.map((booking) => {
      return(
        <div className='bookings'>
          You have booked 
          Trip: <strong><a href={"IndividualTrip/"+booking.trip_id}>{booking.trip_name}</a></strong><br/>
          Seats: <strong>{ booking.seats }</strong>
        </div>
      )
    })
  }

  render() {
    render(<div>
      <Account /><br/>
      </div>,
      document.getElementById('signin')
      );
    render(<div> **************<a href='/'> homelink</a></div>, document.getElementById('second-main'));
    return (
      <div className="container">
          {this.props.userBookings ?
            <div>
              <header>
                Bookings
              </header>
              {this.renderBookings()}
            </div>
          :""}
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
    Meteor.subscribe('userTripBookings');
    return {
        trips: Trips.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),   
        userBookings: UserTripBookings.find({}).fetch()
    };
  })(App);