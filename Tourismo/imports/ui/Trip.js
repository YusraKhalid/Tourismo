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
        <div className='trip-box'>
          <hr></hr>
          <span className="text">
          {Meteor.userId()==this.props.trip.owner ?
          <div className='delete'>
            <button onClick={this.handleRemove.bind(this)} >x</button></div>  :""}
            <strong>
              <h2>
                <center>
                  <a href={"../IndividualTrip/"+this.props.trip._id}>{this.props.trip.destination}</a>
                </center>
              </h2>
            </strong> <br/>
            <div className='trip-basic-info'>
              <b>Company:</b> <a href={'../Company/'+this.props.trip.owner}>{this.props.trip.company}</a> <div className='seats-sold'> <b>Seats booked:</b> {this.props.trip.seats}</div> <br/>
              <b>Cost:</b> Rs. {this.props.trip.price} <br/>
              <b>Days:</b> {this.props.trip.days} <br/>
              <b>Starting date:</b> {this.props.trip.startDate} <br/>
              <b>Ending date:</b> {this.props.trip.endDate} <br/>
              <b>Departure:</b> {this.props.trip.departure} <br/>
              <div className='trip-destination'>
              <b>Destination's Information:</b> {this.props.trip.destinationInformation} <br/>
              </div>
              {this.getRating(this.props.trip.owner)}
            {/* {this.props.trip.image1 ? <img src={this.props.trip.image1} alt="image" width='100%' height='100%'></img>:""} */}
            <b>Company's Rating:</b> 
            <span ref='rate'></span><br/>
            </div>
            <div className='trip-img'>
            <img class="img-fluid" src={this.props.trip.image} alt="image" width='100%' height='100%'></img></div><br/>
          </span>
        </div>
        
       </li>
    );
  }
} 