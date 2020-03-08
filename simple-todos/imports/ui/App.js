import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Trips } from '../api/trips.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import Trip from './Trip.js';
//*******import {BOOK} from '../../lib/ImageCollection';
//*******import {Images} from '../../lib/ImageCollection';


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
        const destination = ReactDOM.findDOMNode(this.refs.destination).value.trim();
        const days = ReactDOM.findDOMNode(this.refs.days).value.trim();
        const startDate = ReactDOM.findDOMNode(this.refs.startDate).value.trim();
        const endDate = ReactDOM.findDOMNode(this.refs.endDate).value.trim();
        //*******const image = localStorage.setItem(ReactDOM.findDOMNode(this.refs.image).value.trim(), destination);
        //*******const image = ReactDOM.findDOMNode(this.refs.image).name;
        const departure = ReactDOM.findDOMNode(this.refs.departure).value.trim();
        const destinationInformation = ReactDOM.findDOMNode(this.refs.destinationInformation).value.trim();
        /*******const image = ReactDOM.findDOMNode(this.refs.image).value.trim();
        bookImage: function (id) {
          // console.log(id);
          var imageBook = Images.findOne({_id:id});
          // console.log("img: "+imageBook);
          var imageUrl = imageBook.url();
          return imageUrl; // Where Images is an FS.Collection instance
      }*/
        Meteor.call('trips.insert', destination, days, startDate, endDate, departure, destinationInformation);
        
        // Clear form
        ReactDOM.findDOMNode(this.refs.destination).value = '';
        ReactDOM.findDOMNode(this.refs.days).value = '0';
        ReactDOM.findDOMNode(this.refs.startDate).value = '';
        ReactDOM.findDOMNode(this.refs.endDate).value = '';
        ReactDOM.findDOMNode(this.refs.image).value = '';
        ReactDOM.findDOMNode(this.refs.departure).value = '';
        ReactDOM.findDOMNode(this.refs.destinationInformation).value = '';
      }  
      
      // remove toggle  
      toggleHideCompleted() {
        this.setState({
          hideCompleted: !this.state.hideCompleted,
        });
      }

  renderTrips() {
    let filteredTrips = this.props.trips;
    /******* can be used for filtering
     * if (this.state.hideCompleted) {
      filteredTrips = filteredTrips.filter(trip => !trip.checked);
    }*/
    return filteredTrips.map((trip) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = trip.owner === currentUserId;

      return (
        <Trip
          key={trip._id}
          trip={trip}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  render() {
    return (
      <div className="container">
        <header>
        <h1>Todo List ({this.props.incompleteCount})</h1>
          <label className="hide-completed">
          <input
            type="checkbox"
            readOnly
            checked={this.state.hideCompleted}
            onClick={this.toggleHideCompleted.bind(this)}
          />
          Hide Completed Trips
        </label>
        <AccountsUIWrapper />
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
              ref="image"
              accept="image/*"
            />
            Departure destination:
            <input
              type="text"
              ref="departure"
              placeholder="Type to add departure location"
            />
            Information about the tourism destination:
            <input
              type="text"
              ref="destinationInformation"
              placeholder="Type to add historic information about the desination"
            />
            <button type="submit">Submit</button>
          </form> : ''
        }
        </header>
        <ul>
          <img src={this.refs.image}></img>
          {this.renderTrips()}
        </ul>
      </div>
    );
    }
  }

  export default withTracker(() => {
    Meteor.subscribe('trips');
    return {
        incompleteCount: Trips.find({ checked: { $ne: true } }).count(),
        trips: Trips.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),   
    };
  })(App);