import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {HomeLinks} from '../api/home.js'
import Account from './Account';
import { render } from 'react-dom';
import { Reviews } from '../api/reviews.js';
import { Trips } from '../api/trips.js';
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

    // findDistinctCompanies(reviews){
    //     var companies = {}
    //     for (var i=0; i<length(review);i++){
    //         if (!(review[i].company in companies)){
    //             companies[review[i].company] = review[i].compan
    //         }
    //     }
    // }
    

    render() {
        // const distinctCompanies = findDistinctCompanies(this.props.companyReview);

        const top = document.getElementById('top-section');
        top.classList.remove('page-inside');
        // console.log('top.className',top.classList);
        document.getElementById('home-description').innerText = "Wallow yourself in the true colours of Pakistan!";
        document.getElementById('home-trips').innerHTML = '<p class="pt-4" data-aos="/fade-up" data-aos-delay="100"><a href="DisplayTrips" target="_blank" class="btn uppercase btn-outline-light d-sm-inline d-block py-3">See Trips</a></p>'
        document.getElementById('scroll-down').innerHTML = '<p  data-aos="/fade-up" data-aos-offset="-500"><a href="#next-section" class="scroll-down smoothscroll"> <span class="fa fa-play"></span> Scroll Down</a></p>        '
        // top.replaceChild(<span id='tophere'></span>);
        // top.replaceWith(<h1>does this work</h1>);
        // top.innerHTML = <h1>Lets try this first</h1>

        // render(
        //     <section class="site-hero overlay" style="background-image: url(/images/index1BG.jpg)">
        //     <div class="container">
        //     <div class="row site-hero-inner justify-content-center align-items-center">
        //         <div class="col-md-10 text-center">
        //         <h1 class="heading mb-4" data-aos="/fade-up">Tourismo</h1>
        //         <p class="sub-heading mb-5" data-aos="/fade-up" data-aos-delay="100">
        //             Wallow yourself in the true colours of Pakistan!
        //         </p>
        //         <p class="pt-4" data-aos="/fade-up" data-aos-delay="100">
        //             <a href="DisplayTrips" target="_blank" class="btn uppercase btn-outline-light d-sm-inline d-block py-3">See Trips</a>
        //         </p>
        //         </div>
        //     </div>
        //     <p  data-aos="/fade-up" data-aos-offset="-500"><a href="#next-section" class="scroll-down smoothscroll"> <span class="fa fa-play"></span> Scroll Down</a></p>
        //     </div>
        //     </section>
        //     ,
        //     document.getElementById('tophere')
        // );

        // console.log("Reviews company: ", this.props.companyReview);
        // Meteor.call('homeLinks.insert');
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
        render(<center>><section className="section testimonial-section bg-light-2">
                    <div className="container">
                        <div className="row justify-content-center text-center mb-5">
                            <div className="col-md-8">
                               <h2 className="heading" data-aos="/fade-up">Happy Customers  </h2>
                            </div>
                        </div>
                        <div className='review-box'>
                        <div className="row">
                            {this.renderReviews()}
                        </div>
                        </div>
                        
                    </div>
                    </section></center>
                ,
                document.getElementById('reviews')
                )
        return(
            <div>
                <section className="section" id="next-section">
                <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-4" data-aos="/fade-up">
                    <p><img src="/images/img_1_long.jpg" alt="Free Template by Free-Template.co" className="img-fluid"/> 
                    </p>
                    </div>
                    <div className="col-lg-6 pl-lg-5" data-aos="/fade-up">
                    <h2 className="mb-4">Welcome To Our Website</h2>
                    <p >Plan your tour with TOURISMO! </p>
                    <p>Tourismo is your way to travel the bewitching loci of Pakitan. Taking you to each and every niche, Tourismo ensures the welfare and serenity of its excursionist. </p>
                    <p className="pt-4">
                        <a href="https://vimeo.com/channels/staffpicks/93951774"  data-fancybox class="btn-play d-flex">
                        <span className="icon align-self-center mr-3"><span className="fa fa-play"></span></span>
                        <span className="text align-self-center">Watch The Video</span>
                        </a>
                    </p>
                    </div>
                </div>
                </div>
                </section>
                
                <center>
                <h2 font = 'arial'>Welcome to Tourismo.<br/>
                How may we help you?<br/>
                Are you: <br/></h2>
                <ul className='home'>
                    <li>
                        <a href="../DisplayTrips">Looking for Trips</a>
                    </li>
                    <li>
                    {requiredLink ? <a href={"../"+requiredLink.link}>{requiredLink.link}</a> : ""}
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
    // Meteor.subscribe('trips');
    return {
        homeLink: HomeLinks.findOne({}),
        reviews: Reviews.find({rating:'5'}).fetch().slice(0,3),
        // companyReview: Reviews.find({}).fetch()
    };
  })(Home);

