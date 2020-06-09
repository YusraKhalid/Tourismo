import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Trips } from '../api/trips.js';
import Trip from './Trip.js';
import Account from './Account';
import { render } from 'react-dom';
import {HomeLinks} from '../api/home.js'


class IndividualTrip extends Component {

    constructor(props) {
        super(props);
    };
    
    handleSubmit(event) {
      event.preventDefault();
        if (Meteor.userId()){
          const seats = this.refs.seats.value;
          console.log("Seats: ", seats);
          var book = confirm("Do you want to book "+seats+" seats?");
          if( book == true ) {
            Meteor.call('trips.book',this.props.trips[0]._id, parseInt(seats), (error, result) => {
              console.log('error: ', error);
              if (error) {
                this.props.history.push("/SignupCustomer");
              }
            });
          } 
          else {
            alert("Your seats were not booked");
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
        const requiredLink = this.props.homeLink;
        if (requiredLink){
            render(<li><a href={'../'+requiredLink.link}>{requiredLink.text}</a></li>,
                document.getElementById('link')
                );
        }
      const trip = this.props.trips[0];
      if (trip){
        console.log("TRip id:", trip._id);
      }
      console.log("Bookings",this.props.bookings);
      // console.log("PAth:----------: ", window.location);

      // console.log("user", this.props.currentUser);
      // console.log("role", this.props.role);
      console.log("Path: ", window.location);
      document.getElementById('only-home').innerHTML = '<span></span>';
      document.getElementById('home-description').innerText = "";
      document.getElementById('home-trips').innerHTML = ''
      document.getElementById('scroll-down').innerHTML = '';
      // document.getElementById('base').href = window.location.origin ;//<base href={window.location.host}/>
      return(
            <div className="container">
              {/* <base href={window.location.origin}/> */}
            <header>
            <h1>Trips</h1>
            </header>
            <ul className='trips'>
              {/* {trip ? <div>
              <a href={'../Company/'+trip.owner}>{trip.company}</a>
              </div>:""} */}
              {this.renderTrips()}
              <div className='trip-booking'>
              <form className='tripBooking' onSubmit={this.handleSubmit.bind(this)}>
                <b>Number of participants or seats: </b>
                <input type='number' ref='seats'></input>
                <button type='submit'>Book</button>
              </form></div>
              {trip ?
              <div className='trip-detail'>
                {trip.detail}<br/>
                {/* {trip.image1 ? <img src={trip.image1} alt="image" width='100%' height='100%'></img>:""} */}
                <br/>
              {trip.bookings ? 
                  <div className='trip-bookings'>
                    {this.renderBookings()}
                  </div> 
                :""}
              </div>:""}
            </ul>
            <div className='clear-end'></div>


            <section class="section bg-light-2">
    <div class="container">
      <div class="row justify-content-center text-center mb-5">
        <div class="col-md-8">
          <h2 class="heading" data-aos="fade-up">Experience Once In Your Life Time</h2>
          <p class="lead" data-aos="fade-up" data-aos-delay="100">Pakistan, a land of diverse culture, consumes you by WANDERLUST!</p>
          <p>Away from the hurly-burly of life, encounter a getaway in Pakistan, which makes you want more of the stupendous panoramas, it offers.</p>
      </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 col-lg-4 mb-4" data-aos="fade-up">
          <div class="d-block ftco-img-flaticon">
            <img src="fonts/flaticon/svg/001-breakfast.svg" alt="Free Template by Free-Template.co" class="img-fluid mb-4"/>
            <h3>Good Foods</h3>
            <p>Pakistan, a soil known for its herbs and spices, has an unparalleled melange of foods. From desserts to mountains, every single traditional food has its own profound history. </p>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="100">
          <div class="d-block ftco-img-flaticon">
            <img src="fonts/flaticon/svg/002-planet-earth.svg" alt="Free Template by Free-Template.co" class="img-fluid mb-4"/>
            <h3>Travel Anywhere</h3>
            <p>From discovering the historic vicinages of the south to expriencing the entrancing vistas of the north, travel it ALL! </p>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="200">
          <div class="d-block ftco-img-flaticon">
            <img src="fonts/flaticon/svg/003-airplane.svg" alt="Free Template by Free-Template.co" class="img-fluid mb-4"/>
            <h3>Travel Mode</h3>
            <p>Take an airbus or a roadbus.
            Board a chairlift to wander through the mountains or mount a rickshaw to meander through the cities.YOU make the call!</p>
          </div>
        </div>

        <div class="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="300">
          <div class="d-block ftco-img-flaticon">
            <img src="fonts/flaticon/svg/004-beach.svg" alt="Free Template by Free-Template.co" class="img-fluid mb-4"/>
            <h3>Seashore</h3>
            <p>Take a day-trip or reserve a personal cabana at your chosen seaside. Have fun cruising or plan a cookout with your pals!  </p>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="400">
          <div class="d-block ftco-img-flaticon">
            <img src="fonts/flaticon/svg/005-mountains.svg"  class="img-fluid mb-4"/>
            <h3>Hills</h3>
            <p>Indulge in the riveting and tranquil mornings at the mountaintops or be a wayfarer and hike across the mountains. </p>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="500">
          <div class="d-block ftco-img-flaticon">
            <img src="fonts/flaticon/svg/005-mountains.svg"  class="img-fluid mb-4"/>
            <h3>Hills</h3>
            <p>Indulge in the riveting and tranquil mornings at the mountaintops or be a wayfarer and hike across the mountains. </p>
          </div>
        </div>

      </div>
    </section>
          </div>
        );
    };
};

export default withTracker(() => {
    Meteor.subscribe('trips');
    Meteor.subscribe('Meteor.users');
    Meteor.subscribe('tripsBookings');
    console.log("userid: ", Meteor.userId());
    Meteor.subscribe('homeLinks');
    return {
        homeLink: HomeLinks.findOne({}),
        trips: Trips.find({ _id: (window.location.pathname).match('[^/]*$')[0] }).fetch(),
        currentUser: Meteor.user(),   
        // bookings: Trips.find({owner: Meteor.userId()}).fetch()
        // role: Meteor.users.find('customer')
    };
  })(IndividualTrip);