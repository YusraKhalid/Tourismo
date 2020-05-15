import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Trips } from '../api/trips.js';
import classnames from 'classnames';
import { withTracker } from 'meteor/react-meteor-data';

// Trip component - represents a single trip item

export default class Trip extends Component {

  getRating(id) {
    Meteor.call('reviews.companyRate', id,
      (err, result) => {
      if (err) {
        console.error("Got error in company:", error);
      } else {
        this.refs.rate.replaceWith(result);
      }
    });
  }
     
  render() {
    // Give trips a different className when they are checked off,
    // so that we can style them nicely in CSS
    const tripClassName = classnames({
      checked: this.props.trip.checked,
      private: this.props.trip.private,
    });

    return (
        <li className={tripClassName}>
        <span className="text">
          <strong><a href={"IndividualTrip/"+this.props.trip._id}>{this.props.trip.destination}</a>
               {/*this.props.trip.username*/}</strong> <br/>
          Company: {this.props.trip.company} <br/>
          Days: {this.props.trip.days} <br/>
          Starting date: {this.props.trip.startDate} <br/>
          Ending date: {this.props.trip.endDate} <br/>
          Departure: {this.props.trip.desparture} <br/>
          Destination's Information: {this.props.trip.destinationInformation} <br/>
          <img src={this.props.trip.image} alt="image" width='200' height='200'></img><br/>
          {this.getRating(this.props.trip.owner)}
          Company's Rating:
          <span ref='rate'></span><br/>
        </span>
        
       </li>
    );
  }
} 