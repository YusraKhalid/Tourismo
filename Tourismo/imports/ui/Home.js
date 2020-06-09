import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {HomeLinks} from '../api/home.js'
import Account from './Account';
import { render } from 'react-dom';
import { Reviews } from '../api/reviews.js';
// import { Trips } from '../api/trips.js';
import Review from './Review.js';
import ReactDom from 'react-dom';
import ScrollAnimation from 'react-animate-on-scroll';

// import '/js/main.js'
// import HomeReview from './HomeReview'


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            link: null, 
            
        };
      }

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
    renderAccounts(){
        ReactDom.render(<div>
            <Account /><br/>
            </div>,
            document.getElementById('signin')
            );
        const requiredLink = this.props.homeLink;
        if (requiredLink){
            document.getElementById("guide-link").href = requiredLink;
            render(<li><a href={'../'+requiredLink.link}>{requiredLink.text}</a></li>,
                document.getElementById('link')
                );
        }
    }
    

    render() {
        const top = document.getElementById('top-section');
        // console.log("URL: ", window.location);
        top.classList.remove('page-inside');
        // document.getElementById('home-description').innerText = "Wallow yourself in the true colours of Pakistan!";
        // document.getElementById('home-trips').innerHTML = '<p class="pt-4  animated fadeInUpBig"><a href="/DisplayTrips" class="btn uppercase btn-outline-light d-sm-inline d-block py-3">See Trips</a></p>'
        // document.getElementById('scroll-down').innerHTML = '<p  className=" animated fadeInUpBig slower"><a href="#next-section" class="scroll-down smoothscroll"> <span class="fa fa-play"></span> Scroll Down</a></p>';
        const requiredLink = this.props.homeLink;
        
        ReactDom.render(<div><center><section class="section testimonial-section bg-light-2">
                    <div class="container">
                        <div class="row justify-content-center text-center mb-5">
                            <div class="col-md-8">
                               <h2 className="heading" data-aos="fade-up">Happy Customers  </h2>
                            </div>
                        </div>
                        <div className='review-box'>
                        <div class="row">
                            {this.renderReviews()}
                        </div>
                        </div>
                        
                    </div>
                    </section></center>
                    </div>
                ,
                document.getElementById('reviews')
                )
                // console.log("host:----------: ", window.location.host);
                // console.log("hostname:----------: ", window.location.hostname);
                // console.log("origin:----------: ", window.location.origin);
                // console.log("href:----------: ", window.location.href);

        return(

            // <ul>
            // {{#transition in="zoomIn" out="bounceOut"}}
            //   {/* {{#each items}} */}
            //     <li class="animated out">{{name}}</li>
            //   {/* {{/each}} */}
            // {{/transition}}
            
            // </ul>
            
            <div>
                {/* <ScrollAnimation animateIn="fadeInDown">
                        Some Text
                    </ScrollAnimation> */}
                {/* <base href={window.location}/> */}
                {/* <h1><a href='/index.html'>Check this</a></h1> */}
                {/* <HomeReview></HomeReview> */}
                {this.renderAccounts()}

                <section className="section bg-light-2" id="next-section">
                <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-4  animated fadeInUpBig">
                    <p><img src="/images/index1BG.jpg" alt="Image" className="img-fluid"/> 
                    </p>
                    </div>
                    <div className="col-lg-6 pl-lg-5" data-aos="fade-up">
                    
                    <h2 className="mb-4">Welcome To Our Website</h2>
                    <p >Plan your tour with TOURISMO! </p>
                    <p>Tourismo is your way to travel the bewitching loci of Pakitan. Taking you to each and every niche, Tourismo ensures the welfare and serenity of its excursionist. </p>
                    <p className="pt-4">
                        <a href="https://vimeo.com/channels/staffpicks/93951774"  data-fancybox className="btn-play d-flex">
                        <span className="icon align-self-center mr-3"><span className="fa fa-play"></span></span>
                        <span className="text align-self-center">Watch The Video</span>
                        </a>
                    </p>
                    </div>
                </div>
                </div>
                </section>
                
                {/* <center>
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
                </center> */}
            </div> 
        )
    };
};
export default withTracker(() => {
    Meteor.subscribe('reviews');
    Meteor.subscribe('homeLinks');
    return {
        homeLink: HomeLinks.findOne({}),
        reviews: Reviews.find({rating:'5'}).fetch().slice(0,3),
    };
  })(Home);

