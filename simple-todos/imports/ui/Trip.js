import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Trips } from '../api/trips.js';
import classnames from 'classnames';
// Trip component - represents a single trip item

export default class Trip extends Component {
    toggleChecked() {
      Meteor.call('trips.setChecked', this.props.trip._id, !this.props.trip.checked);
      }
     
      deleteThisTrip() {
        Meteor.call('trips.remove', this.props.trip._id);
      }
      togglePrivate() {
        Meteor.call('trips.setPrivate', this.props.trip._id, ! this.props.trip.private);
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
        <button className="delete" onClick={this.deleteThisTrip.bind(this)}>
          &times;
        </button>
 
        <input
          type="checkbox"
          readOnly
          checked={!!this.props.trip.checked}
          onClick={this.toggleChecked.bind(this)}
        />
                { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
            { this.props.trip.private ? 'Private' : 'Public' }
          </button>
        ) : ''}
 
        <span className="text">
          <strong>{this.props.trip.username}</strong> <br/>
          Destination: <a href={"IndividualTrip/"+this.props.trip._id}>{this.props.trip.destination}</a>  <br/>
          Days: {this.props.trip.days} <br/>
          Starting date: {this.props.trip.startDate} <br/>
          Ending date: {this.props.trip.endDate} <br/>
          Departure: {this.props.trip.desparture} <br/>
          Destination's Information: {this.props.trip.destinationInformation} <br/>
          <img src={this.props.trip.image} alt="image" width='200' height='200'></img>
        </span>
        
       </li>
    );
  }
}