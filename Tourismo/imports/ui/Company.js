import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Trips } from '../api/trips.js';
import Trip from './Trip.js';
import { Reviews } from '../api/reviews.js';
import Review from './Review.js';
import Account from './Account';
import { render } from 'react-dom';
import {HomeLinks} from '../api/home.js'



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
      reviewer_dp: this.props.currentUser.profile.dp
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
    // console.log("filteredReviews", this.props.reviews);
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
    Meteor.call('reviews.companyRate', (window.location.pathname).match('[^/]*$')[0],
      (err, result) => {
      if (err) {
        console.error("Got error in company:", error);
      } else {
        this.state.rating = result;
      }
    });
    document.getElementById('only-home').innerHTML = '<span></span>';
    document.getElementById('home-description').innerText = "";
    document.getElementById('home-trips').innerHTML = ''
    document.getElementById('scroll-down').innerHTML = '';
    return (
      <div className="container">
        <header>
        <h1>{this.props.id} <br/>
            All Trips of  {this.props.trips[0] ? this.props.trips[0].company : ""}</h1>
            <h2>Rating: {this.state.rating}</h2>
        </header>
        <ul className='trips'>
          {this.renderTrips()}
        </ul>
        <h3>These are the reviews</h3><br/>
        <center><section class="section testimonial-section bg-light-2">
          <div class="container">
            <div class="row justify-content-center text-center mb-5">
              <div class="col-md-8">
                <h2 class="heading" data-aos="fade-up">Customers Feedback</h2>
              </div>
            </div>
            <br></br>
            <div className='review-box'>
            <div class="row">
            {/* <ul> */}
              {this.renderReviews()}
              {/* </ul> */}
            </div>
          </div>
          </div>
        </section></center>
        <br/>
        <div className='add-review'>
        <h3>Add Review:</h3><br/>
        <form className="new-review" onSubmit={this.handleSubmit.bind(this)}>
        Rating:<select ref="rate" defaultValue="5">
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
        </div>
        {/* <br/><br/><br/><br/><br/><br/><br/><br/><br/> */}
        <div className='clear-end'></div>
      </div>
    );
    }
  }

  export default withTracker(() => {
    Meteor.subscribe('trips');
    Meteor.subscribe('reviews');
    Meteor.subscribe('homeLinks');
    return {
        homeLink: HomeLinks.findOne({}),
        trips: Trips.find({ owner: (window.location.pathname).match('[^/]*$')[0] }, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
        reviews: Reviews.find({}).fetch(),
    };
  })(Company);