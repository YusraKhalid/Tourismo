import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Trips, UserTripBookings } from '../api/trips.js';
import Trip from './Trip.js';
import Account from './Account';
import { render } from 'react-dom';
// import {HomeLinks} from '../api/home.js'


class IndividualTrip extends Component {

    constructor(props) {
        super(props);
    };
    
    handleSubmit(event) {
      event.preventDefault();
        if (Meteor.userId()){
          const seats = this.refs.seats.value;
          // console.log("Seats: ", seats);
          if (this.props.userBooking[0]){
            const prev = this.props.userBooking[0];
            var book = confirm("You have already booked "+ prev.seats+" seats for this trip. Do you want you add "+seats+" seats to the booking?");
            if( book == true ) {
              Meteor.call('trips.book',this.props.trips[0]._id, parseInt(seats), (error, result) => {
                console.log('error: ', error);
                if (error) {
                  this.refs.error.replaceWith(error);
                }
                else{
                  alert("Your seats were booked");
                  window.location.pathname = '/DisplayTrips';
                } 
              });
            } 
          }
          else{
            var book = confirm("Do you want to book "+seats+" seats?");
            if( book == true ) {
              Meteor.call('trips.book',this.props.trips[0]._id, parseInt(seats), (error, result) => {
                console.log('error: ', error);
                if (error) {
                  if (error=='Error: Phone not found [not-registered]'){
                    this.props.history.push("/SignupCustomer");
                  }
                  this.refs.error.replaceWith(error);
                }
                else{
                  alert("Your seats were booked");
                  window.location.pathname = '/DisplayTrips';
                } 
              });
            } 
          }
      }
      else{
        window.location.pathname = '/Login';
      }
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
              <tr><td>
                <div className='booking'>
                  Booked by: <b> {booking.customer_name} </b><br/>
                  Contact Number: <b> {booking.customer_phone} </b><br/>
                  Number of seats: <b> {booking.seats} </b>
                </div>
              </td></tr>
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

      document.getElementById('home-description').innerText = "";
      document.getElementById('home-trips').innerHTML = ''
      document.getElementById('scroll-down').innerHTML = '';
      // document.getElementById('base').href = window.location.origin ;//<base href={window.location.host}/>
      return(
            <div className="container">
              {/* <base href={window.location.origin}/> */}
            <header>
            <center>
              <h1>Trip</h1>
            </center>
            </header>
            <ul className='trips'>
              {/* {trip ? <div>
              <a href={'../Company/'+trip.owner}>{trip.company}</a>
              </div>:""} */}
              {this.renderTrips()}
              <div className='trip-booking'>
              <form className='tripBooking' onSubmit={this.handleSubmit.bind(this)}>
                <b>Number of participants or seats: </b>
                <input type='number' className='seat-input' ref='seats'></input>
                <button type='submit'>Book</button>
                <div className='error'>
                  <span ref='error'></span>
                </div>
              </form></div>
              {trip ?
              <div className='trip-detail'>
                {trip.detail}<br/>
                {/* {trip.image1 ? <img src={trip.image1} alt="image" width='100%' height='100%'></img>:""} */}
                <br/>
              {trip.bookings ? 
                  <div className='trip-bookings'>
                    <center>
                      <h1>Bookings</h1>
                    </center>
                    <table className='mytable table table-striped'>
                      <tbody>
                        {this.renderBookings()}
                      </tbody>
                    </table>  
                  </div> 
                :""}
              </div>:""}
            </ul>
            <div className='clear-end'></div>
          </div>
        );
    };
};

export default withTracker(() => {
    Meteor.subscribe('trips');
    Meteor.subscribe('Meteor.users');
    Meteor.subscribe('tripsBookings');
    console.log("userid: ", Meteor.userId());
    Meteor.subscribe('userTripBookings')
    // Meteor.subscribe('homeLinks');
    return {
        // homeLink: HomeLinks.findOne({}),
        trips: Trips.find({ _id: (window.location.pathname).match('[^/]*$')[0] }).fetch(),
        currentUser: Meteor.user(),   
        userBooking: UserTripBookings.find({trip_id:(window.location.pathname).match('[^/]*$')[0]}).fetch()
        // bookings: Trips.find({owner: Meteor.userId()}).fetch()
        // role: Meteor.users.find('customer')
    };
  })(IndividualTrip);