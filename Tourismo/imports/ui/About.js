import React, { Component } from 'react';
import {GuideBookings, AcceptedRequests} from '../api/guide.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Account from './Account';
import { render } from 'react-dom';
// import {HomeLinks} from '../api/home.js'


class About extends Component {

    render() {
        render(<div>
            <Account /><br/>
            </div>,
            document.getElementById('signin')
            );
        // const requiredLink = this.props.homeLink;
        // if (requiredLink){
        //     render(<a className='nav-link' href={'../'+requiredLink.link}>{requiredLink.text}</a>,
        //         document.getElementById('link')
        //         );
        // }
        document.getElementById('only-home').innerHTML = '<span></span>';
        document.getElementById('home-description').innerText = "";
        document.getElementById('home-trips').innerHTML = ''
        document.getElementById('scroll-down').innerHTML = '';
        return(
            <div>
                    {/* <section class="site-hero overlay page-inside">
                    <div class="container">
                        <div class="row site-hero-inner justify-content-center align-items-center">
                        <div class="col-md-10 text-center">
                            <h1 class="heading" data-aos="fade-up">About Us</h1>
                        </div>
                        </div>
                    </div>
                    </section> */}

                    <section class="section ">
                        {/* <center>
                            <h1 className='title' data-aos="fade-up">About Us</h1>
                        </center>
                        <br/> */}
                          <div class="container">
                            <div class="half d-md-flex d-block">
                            <div class="image about" data-aos="fade"></div>
                            <div class="text" data-aos="fade-right" data-aos-delay="200">
                            <h2>Our aim</h2>
                            
                            <p>Tourismo is ambitious to help Pakistan grow its tourism industry, by boosting its market potential. We promise our tourists, locals, and travel partners a platform with developed features, which has been built in terms of the customers’ interest. The tourists can opt for the best travel packages whereas, the locals can register as city guides. </p>
                            {/* <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. </p> */}
                        </div>
                        </div>
                    </div>
                    </section>


                    <section class="section bg-light">
                    <div class="container">
                        <div class="half d-md-flex d-block">

                        <div class="text" data-aos="fade-right" data-aos-delay="200">
                            <h2>Our Motivation</h2>
                            <p>Tourismo is market place, whereTravel agencies, city guides and tourists can interconnect and avail the best opportunities on the market. Here, at Tourismo, we aspire to give our hosts and guests the best domain to work hand in hand.</p>
                            <p>Pakistan, the top travel destination for 2020, is a mighty hub of mesmerizing landscapes, historical sites and cultural heritages. We are eager to portray the different aspects of Pakistan in the most pure and captivating ways. </p>
                            {/* <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. </p> */}
                        </div>
                        <div class="image about2" data-aos="fade"></div>
                        </div>
                        </div>
                    </section>



{/* 
                    <section class="section slider-section bglight-2">
                    <div class="container">
                        <div class="row justify-content-center text-center mb-5">
                        <div class="col-md-8">
                            <h2 class="heading" data-aos="fade-up">Gallery</h2>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-md-12">
                            <div class="home-slider major-caousel owl-carousel mb-5" data-aos="fade-up" data-aos-delay="200">
                            <div class="slider-item">
                                <img src="/images/slider-1.jpg" alt="Image placeholder" class="img-fluid"/>
                            </div>
                            <div class="slider-item">
                                <img src="/images/slider-2.jpg" alt="Image placeholder" class="img-fluid"/>
                            </div>
                            <div class="slider-item">
                                <img src="/images/slider-3.jpg" alt="Image placeholder" class="img-fluid"/>
                            </div>
                            <div class="slider-item">
                                <img src="/images/slider-4.jpg" alt="Image placeholder" class="img-fluid"/>
                            </div>
                            <div class="slider-item">
                                <img src="/images/slider-5.jpg" alt="Image placeholder" class="img-fluid"/>
                            </div>
                            <div class="slider-item">
                                <img src="/images/slider-6.jpg" alt="Image placeholder" class="img-fluid"/>
                            </div>
                            </div>
                        </div>

                        
                        </div>
                    </div>
                    </section> */}

                    <section class="section ">
                    <div class="container">
                        <div class="row justify-content-center text-center mb-5">
                        <div class="col-md-8">
                            <h2 class="heading" data-aos="fade-up">Meet the team</h2>
                            <p class="lead" data-aos="fade-up">Meet the brains behind tourismo</p>

                        </div>
                        </div>
                        <div class="row">
                        <div class="col-lg-4 col-md-6 col-sm-6 col-12 post" data-aos="fade-up" data-aos-delay="100">

                            <div class="media media-custom d-block mb-4">
                            <a href="#" class="mb-4 d-block"><img src="images/person_3.jpg" alt="Image placeholder" class="img-fluid"/></a>
                            <div class="media-body">
                                <p> In the whispers of wind, lies the great stories. Told by nature, heard only by a few</p>
                                <span class="meta-post">Co-Founder</span>
                                <h2 class="mt-0 mb-3"><a href="#">Yusra Khalid</a></h2>
                            </div>
                            </div>

                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6 col-12 post" data-aos="fade-up" data-aos-delay="200">
                            <div class="media media-custom d-block mb-4">
                            <a href="#" class="mb-4 d-block"><img src="images/person_1.jpg" alt="Image placeholder" class="img-fluid"/></a>
                            <div class="media-body">
                                <p>Travel makes one modest, you realise what a tiny place you occupy in the world.</p>
                                <span class="meta-post">Co-Founder</span>
                                <h2 class="mt-0 mb-3"><a href="#">Hibba Fatima</a></h2>
                            </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6 col-12 post" data-aos="fade-up" data-aos-delay="300">
                            <div class="media media-custom d-block mb-4">
                            <a href="#" class="mb-4 d-block"><img src="images/person_2.jpg" alt="Image placeholder" class="img-fluid"/></a>
                            <div class="media-body">
                                <p>The world is a book and those who do not travel, read only one page of it.</p>
                                <span class="meta-post">Co-Founder</span>
                                <h2 class="mt-0 mb-3"><a href="#">Nimra.</a></h2>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </section>

                <div className='clear-end'></div>
            </div> 
        )
    };
};
export default withTracker(() => {
    // Meteor.subscribe('homeLinks');
    return {
        // homeLink: HomeLinks.findOne({}),
        currentUser: Meteor.user(),
    };
  })(About);
