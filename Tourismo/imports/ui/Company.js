import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Trips } from '../api/trips.js';
import Trip from './Trip.js';
import { Reviews } from '../api/reviews.js';
import Review from './Review.js';
import Account from './Account';
import { render } from 'react-dom';
// import {HomeLinks} from '../api/home.js'



class Company extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hideCompleted: false,
      rating: '',
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
      if (this.props.thisReviewer){
        var replace = confirm("You already have following review for this company. Do you want to replace it? Rating:"+ this.props.thisReviewer[0].rating +" Review:"+this.props.thisReviewer[0].remarks);
        if (replace == true){
          Meteor.call('reviews.insert', review);
        }
      }
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

  renderCompanyData(){
    console.log("Windo id: ", (window.location.pathname).match('[^/]*$')[0]);
    Meteor.call('users.companyData', (window.location.pathname).match('[^/]*$')[0],
    (err, result) => {
      if(err){
        console.log("Error: ", err);
      }
      else{
        console.log('Result Company: ', result);
        this.refs.phone.replaceWith(result[0].phone);
        if (result[0].intro){
          this.refs.intro.replaceWith(result[0].intro);
        }
        if (result[0].link){
          this.refs.link.replaceWith(result[0].link);
        }
        this.refs.address.replaceWith(result[0].address);
      }
    })
  }

  render() {
    this.renderCompanyData();
    console.log("comp: ", this.props.comp);
    render(<div>
      <Account /><br/>
      </div>,
      document.getElementById('signin')
      );
      // const requiredLink = this.props.homeLink;
      // if (requiredLink){
      //     render(<li><a href={'../'+requiredLink.link}>{requiredLink.text}</a></li>,
      //         document.getElementById('link')
      //         );
      // }
    Meteor.call('reviews.companyRate', (window.location.pathname).match('[^/]*$')[0],
      (err, result) => {
      if (err) {
        console.error("Got error in company:", error);
      } else {
        const wholenumber = Math.floor(result);
        if ((result - wholenumber) >= 0.5){
          wholenumber += 0.5 
        }
        this.state.rating = "/images/rating/Star_rating_" + wholenumber + "_of_5.png";
        // this.state.rating = result;
      }
    });
    document.getElementById('only-home').innerHTML = '<span></span>';
    document.getElementById('home-description').innerText = "";
    document.getElementById('home-trips').innerHTML = ''
    document.getElementById('scroll-down').innerHTML = '';
    return (
      <div className="container">
        {/* <section> */}
        <header>
        <h1>{this.props.id} <br/>
          <center>
            {/* {this.props.comp ? <img width='20%' height='20%' src={this.props.comp.profile.dp} /> : ""} <br/> */}
            {/* All Trips of   */}
            {this.props.trips[0] ? this.props.trips[0].company : ""}
          </center>
        </h1>
        <center>
          <div className='company-intro'>
            <span ref='intro'></span><br/>
            {/* <span ref='license'></span><br/> */}
            <div className='trip-data'>
              <span ref='address'></span><br/>
              <span ref='link'></span><br/>
              <span ref='phone'></span><br/>
            </div>
          </div>
          <h2 className='trip-company-rate'>Rating: <img src={this.state.rating} width='150px' ref='rate'></img></h2>
        </center>
        </header>
        <ul className='trips'>
          {this.renderTrips()}
        </ul>
        <div className='clear-end'></div>
          <div className='add-review'>
            <center><h3>Add Review:</h3><br/>
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
            </center>
          </div>
        <div className='clear-end'></div>

        
        <center><section class="section testimonial-section bg-light-2">
          <div class="container">
            <div class="row justify-content-center text-center mb-5">
              <div class="col-md-8">
                <h2 class="heading" data-aos="fade-up">Customers Feedback</h2>
              </div>
            </div>
            {/* <div className='clear-end'></div> */}
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
        {/* <br/><br/><br/><br/><br/><br/><br/><br/><br/> */}
        <div className='clear-end'></div>
        {/* </section> */}
      </div>
    );
    }
  }

  export default withTracker(() => {
    Meteor.subscribe('trips');
    Meteor.subscribe('reviews');
    // Meteor.subscribe('homeLinks');
    return {
        // homeLink: HomeLinks.findOne({}),
        trips: Trips.find({ owner: (window.location.pathname).match('[^/]*$')[0] }, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
        reviews: Reviews.find({company: (window.location.pathname).match('[^/]*$')[0]}).fetch(),
        thisReviewer: Reviews.find({company: (window.location.pathname).match('[^/]*$')[0], reviewer: Meteor.userId()}).fetch(),
        comp: Meteor.users.findOne({_id:(window.location.pathname).match('[^/]*$')[0]})
    };
  })(Company);