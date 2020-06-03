import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Trips, UserTripBookings } from '../api/trips.js';
import Trip from './Trip.js';
import { render } from 'react-dom';
import Account from './Account';
import {HomeLinks} from '../api/home.js'



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
      const requiredLink = this.props.homeLink;
        if (requiredLink){
            render(<li><a href={'../'+requiredLink.link}>{requiredLink.text}</a></li>,
                document.getElementById('link')
                );
        }
      document.getElementById('only-home').innerHTML = '<span></span>';
    // render(<div> **************<a href='/'> homelink</a></div>, document.getElementById('second-main'));
    return (
      <div className="container">
          {this.props.userBookings ?
            <div>
              <center>
                <h1>
                  Bookings
                </h1>
                {this.renderBookings()}
              </center>
            </div>
          :""}
        <header>
        <center><h1>Trips</h1></center>
        </header>
        <ul className='trips'>
          {this.renderTrips()}
        </ul>
        <br></br>
        <div className='clear-end'></div>
      </div>
    );
    }
  }

  export default withTracker(() => {
    Meteor.subscribe('trips');
    Meteor.subscribe('userTripBookings');
    Meteor.subscribe('homeLinks');
    return {
        homeLink: HomeLinks.findOne({}),
        trips: Trips.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),   
        userBookings: UserTripBookings.find({}).fetch()
    };
  })(App);