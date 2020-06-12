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
        const wholenumber = Math.floor(result);
        if ((result - wholenumber) >= 0.5){
          wholenumber += 0.5 
        }
        this.refs.rate.src = "/images/rating/Star_rating_" + wholenumber + "_of_5.png";  //replaceWith(result);
        // console.log("href: ", this.refs.rate.src);
      }
    });
  }

  // /images/rating/Star_rating_5_of_5.png

  handleRemove() {
    var remove = confirm("Sure you want to delete this?");
    if( remove == true ) {
      Meteor.call('trips.remove', this.props.trip._id);
    }
  }

  getPhone(id){
    Meteor.call('trip.companyPhone', id,
      (err, result) => {
        if (result){
          console.log("Phone result:", result)
          this.refs.phone.replaceWith(result);
          return(result)
        }
      })
  }
     
  render() {
    const tripClassName = classnames({
      checked: this.props.trip.checked,
      private: this.props.trip.private,
    });

    // console.log("trip", this.props.trip);
    if (!this.props.trip.phone){
      const phone = this.getPhone(this.props.trip.company)
    }
    return (
        <li className={tripClassName}>
        <div className='trip-box'>
          <hr></hr>
          <span className="text">
          {Meteor.userId()==this.props.trip.owner ?
          <div className='delete'>
            <button onClick={this.handleRemove.bind(this)} >x</button></div>  :""}
            <strong>
              <h2 className='trip-name'>
                <center>
                  <a href={"../IndividualTrip/"+this.props.trip._id}>{this.props.trip.destination}</a>
                </center>
              </h2>
            </strong> <br/>
            <div className='trip-basic-info' data-aos="fade-right">
              <b>Company:</b> <a className='trip-name' href={'../Company/'+this.props.trip.owner}>{this.props.trip.company}</a> 
              <div className='seats-sold'> <b>Seats booked:</b> <span className='trip-data'>{this.props.trip.seats}</span></div> <br/>
              <b>Cost:</b><span className='trip-data'>  Rs. {this.props.trip.price} </span> <br/>
              {this.props.trip.phone? 
                <div>
                  <b>Phone:</b> <span className='trip-data'>{this.props.trip.phone} </span><br/>
                </div>
                :
                <div>
                  <b>Phone:</b> <span className='trip-data'><span ref='phone'></span> </span><br/>
                  {this.getPhone(this.props.trip.owner)}
                </div>
              }
              <b>Starting date:</b> <span className='trip-data'>{this.props.trip.startDate}</span> <br/>
              <b>Ending date:</b> <span className='trip-data'>{this.props.trip.endDate} </span><br/>
              <b>Departure:</b> <span className='trip-data'> {this.props.trip.departure}</span> <br/>
              <div className='trip-destination'>
              <b>Destination's Information:</b> {this.props.trip.destinationInformation} <br/>
              </div>
              {this.getRating(this.props.trip.owner)}
            {/* {this.props.trip.image1 ? <img src={this.props.trip.image1} alt="image" width='100%' height='100%'></img>:""} */}
            <b><span className='trip-data'>Company's Rating: </span></b> 
            <img src='/images/rating/Star_rating_0_of_5.png' width='100px' ref='rate'></img><br/>
            </div>
            <div className='trip-img' data-aos="fade-left">
            <img class="img-fluid" src={this.props.trip.image} alt="image" width='100%' height='100%'></img></div><br/>
          </span>
        </div>
        
       </li>
    );
  }
} 