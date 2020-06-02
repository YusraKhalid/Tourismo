import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Trips } from '../api/trips.js';
import Trip from './Trip.js';
import Account from './Account';
import { render } from 'react-dom';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const today = new Date();
    const trip = {
        userId: Meteor.userId(),
        destination : this.refs.destination.value,
        days : this.refs.days.value,
        startDate : this.refs.startDate.value,
        endDate : this.refs.endDate.value,
        departure : this.refs.departure.value,
        destinationInformation : this.refs.destinationInformation.value,
        price: this.refs.price.value,
        detail : this.refs.detail.value};
    var flag = true;
    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);
    if ((today > startDate) | (today > endDate)){
      flag = false;
      this.refs.incorrectDate.replaceWith("Enter the future date");
    }
    if (trip.days < 0){
      flag = false
      this.refs.incorrectDays.replaceWith('Enter valid number of days');
    }
    if (trip.price < 0){
      flag = false
      this.refs.incorrectDays.replaceWith('Enter valid price');
    }
    if (flag == true){
      var input = document.getElementById("image");
      var fReader = new FileReader();
      fReader.onloadend = function(event){
        Meteor.call('trips.insert', trip, event.target.result); 
      }     
      fReader.readAsDataURL(input.files[0]);

    // var image1 = document.getElementById("image1");
    // var image2 = document.getElementById("image2");
    // var image3 = document.getElementById("image3");
    // var image4 = document.getElementById("image4");
    // console.log("input", input);
    // console.log("input.files",  input.files);
    // console.log("input.files[0]",  input.files[0]);
    // console.log("input.files[1]",  input.files[1]);
    // // const images = []
    // fReader.onloadend = function(event){
    //   console.log("EVENT result", event.target.result)
    //   const img = event.target.result;
    //   images.push(img);
    //   console.log("images", images);
    //   fReader.readAsDataURL(image1.files[0]);
    //   fReader.onloadend = function(event){
    //     Meteor.call('trips.insert', trip, img, event.target.result); 
    //   }     
    //   }  
    // function imageReader()function callback(images) {
    //         console.log("callback:",images);
    // }){
      // var fReader = new FileReader();
      // fReader.onloadend = function(event){
      //   console.log("Onloadend",images);
      // }
      // for (var i = 0; i < input.files.length; i++) {
      //   var fReader = new FileReader();
      //   fReader.onload = function(event){
      //     // console.log("EVENT result", event.target.result)
      //     const img = event.target.result;
      //     images.push(img);
      //     console.log("I: ", i);
      //     console.log("images", images);
      //     // if (i-1 == input.files.length){
      //     //   console.log("if condition: ",images);
      //     // }
      //   }
      //   fReader.readAsDataURL(input.files[i]);
      // } 
    // }
    // console.log("After for loop: ",images);
  }
    

    // Clear form
    this.refs.destination.value = '';
    this.refs.days.value = '0';
    this.refs.startDate.value = '';
    this.refs.endDate.value = '';
    this.refs.image.value = '';
    this.refs.departure.value = '';
    this.refs.destinationInformation.value = '';
    this.refs.detail.value = '';
  }  

  renderTrips() {
    let filteredTrips = this.props.trips;
    return filteredTrips.map((trip) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      if (trip.owner === currentUserId){
      return (
        <div>
          <Trip
            key={trip._id}
            trip={trip}
          ></Trip>        
        </div>
      );
        }
    });
  }

  render() {
    render(<div>
      <Account /><br/>
      </div>,
      document.getElementById('signin')
      );
    return (
      <div className="container">
        <header>
        <h1>{this.props.id} <br/>
            All Trips of This company{this.props.owner}</h1>
        { this.props.currentUser ?
          <form className="new-trip" onSubmit={this.handleSubmit.bind(this)} >
            Destination:
            <input
              type="text"
              ref="destination"
              placeholder="Type to add desination"
            /> <br/>
            Number of Days:
            <input
              type="number"
              ref="days"
              placeholder="Type to add number of days"
            />
            <div className='error'>
            <span ref='incorrectDays' ></span></div><br/>
            Staring Date: 
            <input
              type="date"
              ref="startDate"
            /><br/>
            Ending Date: 
            <input
              type="date"
              ref="endDate"
            />
            <div className='error'>
            <span ref='incorrectDate'  ></span></div><br/>
            Ticket price:
            <input
              type="number"
              ref="price"
              placeholder="Type to add price in PKR"
            />
            <div className='error'>
            <span ref='incorrectPrice' ></span></div><br/>
            Display image of the destination:  
            <input
              type="file"
              id="image"
              ref="image"
              multiple="multiple"
              accept="image/*"
            /><br/>
            Departure destination:
            <input
              type="text"
              ref="departure"
              placeholder="Type to add departure location"
            /><br/>
            Brief information about the tourism destination:
            <input
              type="text"
              ref="destinationInformation"
              placeholder="Type to add historic information about the desination"
            /><br/>
            Details of the trip:
            <input
              type="text"
              ref="detail"
              placeholder="Type to add all informantion regarding your trip"
            /><br/>
            {/* Additional images of the destination (optional):  
            <input
              type="file"
              id="image1"
              ref="image1"
              accept="image/*"
              /><input
              type="file"
              id="image2"
              ref="image2"
              accept="image/*"
              /><input
              type="file"
              id="image3"
              ref="image3"
              accept="image/*"
              /><input
              type="file"
              id="image4"
              ref="image4"
              accept="image/*"
      /><br/> */}

            <button type="submit">Submit</button>
          </form> : ''
        }
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