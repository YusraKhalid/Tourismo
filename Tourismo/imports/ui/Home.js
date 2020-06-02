import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {HomeLinks} from '../api/home.js'
import Account from './Account';
import { render } from 'react-dom';
import { Reviews } from '../api/reviews.js';
import Review from './Review.js';


class Home extends Component {

    renderReviews() {
        let filteredReviews = this.props.reviews;
        console.log("Initial", filteredReviews);
        if (filteredReviews){
            console.log("filteredReviews", [filteredReviews[0],filteredReviews[1],filteredReviews[2]]);
        }
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
        console.log("Links: ", requiredLink);
        render(<center>><section class="section testimonial-section bg-light-2">
                    <div class="container">
                        <div class="row justify-content-center text-center mb-5">
                            <div class="col-md-8">
                               <h2 class="heading" data-aos="fade-up">Happy Customers  </h2>
                            </div>
                        </div>
                        <div className='review-box'>
                        <div class="row">
                            {this.renderReviews()}
                        </div>
                        </div>
                        
                    </div>
                    </section></center>
                ,
                document.getElementById('reviews')
                )
        return(
            <div><center>
                <h2 font = 'arial'>Welcome to Tourismo.<br/>
                How may we help you?<br/>
                Are you: <br/></h2>
                <ul className='home'>
                    <li>
                        <a href="DisplayTrips">Looking for Trips</a>
                    </li>
                    <li>
                    {requiredLink ? <a href={requiredLink.link}>{requiredLink.link}</a> : ""}
                    </li>
                </ul>
                </center>
            </div> 
        )
    };
};
export default withTracker(() => {
    Meteor.subscribe('homeLinks');
    Meteor.subscribe('reviews');
    return {
        homeLink: HomeLinks.findOne({}),
        reviews: Reviews.find({rating:'5'}).fetch().slice(0,3),

    };
  })(Home);

