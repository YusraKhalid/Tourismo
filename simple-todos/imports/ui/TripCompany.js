import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Trips } from '../api/trips.js';
import Trip from './Trip.js';


// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hideCompleted: false,
    };
  }

    handleSubmit(event) {
        event.preventDefault();
        // Find the text field via the React ref
        const trip = {
            userId: Meteor.userId(),
            destination : this.refs.destination.value,
            days : this.refs.days.value,
            startDate : this.refs.startDate.value,
            endDate : this.refs.endDate.value,
            departure : this.refs.departure.value,
            destinationInformation : this.refs.destinationInformation.value,
            detail : this.refs.detail.value};
        var input = document.getElementById("image");
        var fReader = new FileReader();
        fReader.readAsDataURL(input.files[0]);
        fReader.onloadend = function(event){
          Meteor.call('trips.insert', trip, event.target.result);         
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
      
      // remove toggle  
      toggleHideCompleted() {
        this.setState({
          hideCompleted: !this.state.hideCompleted,
        });
      }

  renderTrips() {
    let filteredTrips = this.props.trips;
    //filteredTrips = filteredTrips.filter(trip.owner => currentUserId);
    /******* can be used for filtering
     * if (this.state.hideCompleted) {
      filteredTrips = filteredTrips.filter(trip => !trip.checked);
    }*/
    return filteredTrips.map((trip) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      //console.log("currentuserprofile: ", this.props.currentUser.profile.age)
      console.log("currentuserid: ", this.props.currentUser._id);
      //const role = Meteor.call('user.checkrole', this.props.currentUser._id, 'customer');

      if (trip.owner === currentUserId){
      //const showPrivateButton = trip.owner === currentUserId;

      return (
        <Trip
          key={trip._id}
          trip={trip}
          //showPrivateButton={showPrivateButton}
        />
      );
        }
    });
  }

  render() {
    console.log("check here**: ", this.props.check);
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
            />
            Number of Days:
            <input
              type="number"
              ref="days"
              placeholder="Type to add number of days"
            />
            Staring Date: 
            <input
              type="date"
              ref="startDate"
            />
            Ending Date: 
            <input
              type="date"
              ref="endDate"
            />
            Image of the destination:  
            <input
              type="file"
              id="image"
              ref="image"
              accept="image/*"
            />
            Departure destination:
            <input
              type="text"
              ref="departure"
              placeholder="Type to add departure location"
            />
            Brief information about the tourism destination:
            <input
              type="text"
              ref="destinationInformation"
              placeholder="Type to add historic information about the desination"
            />
            Details of the trip:
            <input
              type="text"
              ref="detail"
              placeholder="Type to add all informantion regarding your trip"
            />
            <button type="submit">Submit</button>
          </form> : ''
        }
        </header>
        <ul>
          {this.renderTrips()}
        </ul>
      </div>
    );
    }
  }

  export default withTracker(() => {
    Meteor.subscribe('trips');
    // console.log("sub: ",Meteor.subscribe('Meteor.users'));
    return {
        incompleteCount: Trips.find({ checked: { $ne: true } }).count(),
        trips: Trips.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
        check: Trips.find({company:'My Company'},{destination:1}).fetch()
    };
  })(App);