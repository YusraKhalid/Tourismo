import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import classnames from 'classnames';

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

  handleRemove() {
    alert("Sure you want to delete this?") (
    Meteor.call('trips.remove', this.props.trip._id));
  }
     
  render() {
    const tripClassName = classnames({
      checked: this.props.trip.checked,
      private: this.props.trip.private,
    });
    console.log("trip", this.props.trip);

    return (
        <li className={tripClassName}>
        <span className="text">
        {Meteor.userId()==this.props.trip.owner ?
         <div className='delete'>
          <button onClick={this.handleRemove.bind(this)} >x</button></div>  :""}
          <strong><a href={"IndividualTrip/"+this.props.trip._id}>{this.props.trip.destination}</a></strong> <br/>
        Company: {this.props.trip.company} <div className='seats-sold'> Seats booked: <b>{this.props.trip.seats}</b></div> <br/>
          Cost: {this.props.trip.price} <br/>
          Days: {this.props.trip.days} <br/>
          Starting date: {this.props.trip.startDate} <br/>
          Ending date: {this.props.trip.endDate} <br/>
          Departure: {this.props.trip.desparture} <br/>
          Destination's Information: {this.props.trip.destinationInformation} <br/>
          <img src={this.props.trip.image} alt="image" width='100%' height='100%'></img><br/>
          {this.getRating(this.props.trip.owner)}
          {/* {this.props.trip.image1 ? <img src={this.props.trip.image1} alt="image" width='100%' height='100%'></img>:""} */}
          Company's Rating:
          <span ref='rate'></span><br/>
        </span>
        
       </li>
    );
  }
} 