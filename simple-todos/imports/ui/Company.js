import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Trips } from '../api/trips.js';
import Trip from './Trip.js';
import { Reviews } from '../api/reviews.js';
import Review from './Review.js';


class Company extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hideCompleted: false,
      rating: ''
    };
  }
  handleSubmit(event){
    event.preventDefault();
    if (Meteor.userId()){
      console.log("adding");
    const review = {
      company: (window.location.pathname).match('[^/]*$')[0],
      rating: this.refs.rate.value,
      remarks: this.refs.remarks.value,
    }
    Meteor.call('reviews.insert', review);
  }
  else{
    this.props.history.push('/Login');
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

  renderReviews() {
    let filteredReviews = this.props.reviews;
    console.log("filteredReviews", this.props.reviews);
    return filteredReviews.map((review) => {
      return (
        <Review
          key={review._id}
          review={review}
        />
      );
    });
  }

  render() {
    Meteor.call('reviews.companyRate', (window.location.pathname).match('[^/]*$')[0],
      (err, result) => {
      if (err) {
        console.error("Got error in company:", error);
      } else {
        this.state.rating = result;
      }
    });
    return (
      <div className="container">
        <header>
        <h1>{this.props.id} <br/>
            All Trips of {this.props.trips[0] ? this.props.trips[0].company : ""}</h1>
            <h2>Rating: {this.state.rating}</h2>
        </header>
        <ul className='trips'>
          {this.renderTrips()}
        </ul>
        <h3>These are the reviews</h3><br/>
        <ul>
          {this.renderReviews()}
        </ul>
        <h3>Add Review:</h3><br/>
        <form className="new-review" onSubmit={this.handleSubmit.bind(this)}>
        <select ref="rate">
            <option value="1">1</option><br/>
            <option value="2">2</option><br/>
            <option value="3">3</option><br/>
            <option value="4">4</option><br/>
            <option value="5">5</option><br/>
        </select>
        Rewiew:
          <input type="text" ref="remarks"/>
        <button type="submit"> Submit </button>
        </form>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>

      </div>
    );
    }
  }

  export default withTracker(() => {
    Meteor.subscribe('trips');
    Meteor.subscribe('reviews');
    return {
        trips: Trips.find({ owner: (window.location.pathname).match('[^/]*$')[0] }, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
        reviews: Reviews.find({}).fetch(),
    };
  })(Company);