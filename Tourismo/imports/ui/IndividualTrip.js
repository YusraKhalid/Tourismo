import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Trips } from '../api/trips.js';
import Trip from './Trip.js';
import Account from './Account';
import { render } from 'react-dom';


class IndividualTrip extends Component {

    constructor(props) {
        super(props);
    };
    
    handleSubmit(event) {
      event.preventDefault();
      const seats = this.refs.seats.value;
      console.log("Seats: ", seats);
      // alert("Do you want to book "+seats+" for this trip?") ()
      Meteor.call('trips.book',this.props.trips[0]._id, parseInt(seats), (error, result) => {
        console.log('error: ', error);
        if (error) {
          this.props.history.push("/SignupCustomer");
        }
        console.log('result: ', result);
      });
    }

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
        const bookings = this.props.trips[0].bookings;
        console.log("renderbookings", bookings);
        return(bookings.map((booking)=>{
            return(
              <div className='booking'>
                Booked by: <b> {booking.customer_name} </b><br/>
                Contact Number: <b> {booking.customer_phone} </b><br/>
                Number of seats: <b> {booking.seats} </b>
              </div>
            )
          })
        )
      }

    render() {
      render(<div>
        <Account /><br/>
        </div>,
        document.getElementById('signin')
        );
      const trip = this.props.trips[0];
      if (trip){
        console.log("TRip id:", trip._id);
      }
      console.log("Bookings",this.props.bookings);
      // console.log("user", this.props.currentUser);
      // console.log("role", this.props.role);
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
              {trip ?
              <div>
                {trip.detail}<br/>
                {/* {trip.image1 ? <img src={trip.image1} alt="image" width='100%' height='100%'></img>:""} */}
              
                {trip.bookings ? 
                  <div>
                    {this.renderBookings()}
                  </div> 
                :""}
              </div>
              :""}
              <form className='tripBooking' onSubmit={this.handleSubmit.bind(this)}>
                Number of participants or seats: 
                <input type='number' ref='seats'></input>
                <button type='submit'>Book</button>
              </form>
            </ul>
          </div>
        );
    };
};

export default withTracker(() => {
    Meteor.subscribe('trips');
    Meteor.subscribe('Meteor.users');
    Meteor.subscribe('tripsBookings');
    console.log("userid: ", Meteor.userId());
    return {
        trips: Trips.find({ _id: (window.location.pathname).match('[^/]*$')[0] }).fetch(),
        currentUser: Meteor.user(),   
        // bookings: Trips.find({owner: Meteor.userId()}).fetch()
        // role: Meteor.users.find('customer')
    };
  })(IndividualTrip);