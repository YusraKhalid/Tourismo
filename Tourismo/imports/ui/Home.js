import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {HomeLinks} from '../api/home.js'
import Account from './Account';
import { render } from 'react-dom';
import { Reviews } from '../api/reviews.js';
import Review from './Review.js';
import ReactDom from 'react-dom';
import 'aos/dist/aos.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';


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
    }
    

    render() {
        $(".owl-carousel").owlCarousel({
            items : 1,
            autoplay: true,
            autoPlay: 1500, //Set AutoPlay to 3 seconds
            
            });
        const top = document.getElementById('top-section');
        top.classList.remove('page-inside');   
        return(
            <div>
                {this.renderAccounts()}

                <section className="section bg-light-2" id="next-section">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 mb-4  animated fadeInUpBig">
                                <p>
                                    <img src="/images/index1BG.jpg" alt="Image" className="img-fluid shadow"/> 
                                </p>
                            </div>
                            <div className="col-lg-6 pl-lg-5" data-aos="fade-up">
                                <h2 className="mb-4">Welcome To Our Website</h2>
                                <p >Plan your tour with TOURISMO! </p>
                                <p>Tourismo is your way to travel the bewitching loci of Pakitan. Taking you to each and every niche, Tourismo ensures the welfare and serenity of its excursionist. </p>
                                <p className="pt-4">
                                    <a href="https://www.youtube.com/watch?v=-D11YMhyzcg"  data-fancybox className="btn-play d-flex">
                                        <span className="icon align-self-center mr-3"><span className="fa fa-play"></span></span>
                                        <span className="text align-self-center">Watch The Video</span>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="section slider-section">
                    <div class="container">
                        <div class="row justify-content-center text-center mb-5">
                        <div class="col-md-8">
                        <h2 class="heading animated fadeInUpBig">City Captian Facility</h2>
                        <p class="lead animated fadeInUpBig"  data-aos-delay="100">Tourismo also serves you the city captain facility! </p>
                        <p>Not only it renders personal tour guide facility and also brings all travel agencies to a single platform, it provide the opportunity to earn by exploring.
                            Moreover, we assure complete comfort and well-being of our precious tourists. To make the exploring and avdentures reliable we also provide the ability to hire a city captain.</p>
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
                </section>

                <section class="section blog-post-entry bg-light slant-top">
                    <div class="container">
                        <div class="row justify-content-center text-center mb-5">
                            <div class="col-md-8 primary-bg-text">
                            <h2 class="heading animated fadeInUpBig" >Travel Blogs</h2>
                            <p class="lead animated fadeInUpBig">Pakistan has been declared world's third highest potential adventure destination for 2020. With its bustling streets, captivating nature, and warm people, Pakistan is a bundle of pure joy!  </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4 col-md-4 col-sm-4 col-12 post animated fadeInUpBig" data-aos-delay="100">
                            <div class="media media-custom d-block mb-4">
                                <a href="#" class="mb-4 d-block"><img src="/images/img_1.jpg" alt="Image placeholder" class="img-fluid"/></a>
                                <div class="media-body">
                                <span class="meta-post">February 3, 2020</span>
                                <h2 class="mt-0 mb-3"><a href="https://www.pakistantravelguide.pk/2020/02/03/rosie-gabrielle-puts-her-soul-and-heart-in-this-latest-uploaded-video-about-pakistan/">Rosie Gabrielle visit of Pakistan.</a></h2>
                                <p>Rosie Gabrielle puts her soul and heart in this latest uploaded video about Pakistan... </p>
                                </div>
                            </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-12 post" data-aos="fade-up" data-aos-delay="200">
                            <div class="media media-custom d-block mb-4">
                                <a href="#" class="mb-4 d-block"><img src="/images/img_2.jpg" alt="Image placeholder" class="img-fluid"/></a>
                                <div class="media-body">
                                <span class="meta-post">January 22, 2020</span>
                                <h2 class="mt-0 mb-3"><a href="https://www.pakistantravelguide.pk/2020/01/22/8-places-to-visit-in-hunza-valley-2020/">8 Places to Visit in Hunza Valley 2020</a></h2>
                                <p>8 Places which are must-see on your tour to Hunza Valley, Hunza valley had natural beauty... </p>
                                </div>
                            </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-12 post" data-aos="fade-up" data-aos-delay="300">
                            <div class="media media-custom d-block mb-4">
                                <a href="#" class="mb-4 d-block"><img src="/images/img_3.jpg" alt="Image placeholder" class="img-fluid"/></a>
                                <div class="media-body">
                                <span class="meta-post">October 17, 2019</span>
                                <h2 class="mt-0 mb-3"><a href="https://www.lostwithpurpose.com/things-to-know-pakistan/">Pakistan travel: things to know before going.</a></h2>
                                <p>After months of backpacking in Pakistan, here’s my complete Pakistan travel guide... </p>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div><center><section class="section testimonial-section bg-light-2">
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
                {/* <div id='reviews'>
                </div> */}

                <section class="section visit-section">
                    <div class="container">
                        <div class="row justify-content-center text-center mb-5">
                            <div class="col-md-8 ">
                            <h2 class="heading" data-aos="fade-up">Trip Organizers</h2>
                            <p class="lead" data-aos="fade-up">Find the best travel agencies here.</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3 col-md-6 visit mb-3" data-aos="fade-right">
                            <a href="/Company/NdGa2uepBptCM3dD8"><img src="/images/img_8.jpg" alt="Image placeholder" class="img-fluid"/> </a>
                            <h3><a href="/Company/NdGa2uepBptCM3dD8">Excursion</a></h3>
                            </div>
                            <div class="col-lg-3 col-md-6 visit mb-3" data-aos="fade-right" data-aos-delay="100">
                            <a href="/Company/P7u6ycy3zyhHMY834"><img src="/images/img_7.jpg" alt="Image placeholder" class="img-fluid"/> </a>
                            <h3><a href="/Company/P7u6ycy3zyhHMY834">Travel Pakistan</a></h3>
                            </div>
                            <div class="col-lg-3 col-md-6 visit mb-3" data-aos="fade-right" data-aos-delay="200">
                            <a href="/Company/ANzegkKBQ8hEkgBTd"><img src="/images/img_4.jpg" alt="Image placeholder" class="img-fluid"/> </a>
                            <h3><a href="/Company/ANzegkKBQ8hEkgBTd">Ser O Seahat</a></h3>
                            </div>
                            <div class="col-lg-3 col-md-6 visit mb-3" data-aos="fade-right" data-aos-delay="300">
                            <a href="Company/hXWwFqEiCstDzjTM8"><img src="/images/img_5.jpg" alt="Image placeholder" class="img-fluid"/> </a>
                            <h3><a href="Company/hXWwFqEiCstDzjTM8">Adventure Club</a></h3>
                            </div>
                        </div>
                    </div>
                </section>
                {/* </div> */}
                // <div className='ending'>
                <section class="section bg-light-2">
                    <div class="container">
                    <div class="row justify-content-center text-center mb-5">
                        <div class="col-md-8">
                        <h2 class="heading" data-aos="fade-up">Experience Once In Your Life Time</h2>
                        <p class="lead" data-aos="fade-up" data-aos-delay="100">Pakistan, a land of diverse culture, consumes you by WANDERLUST!</p>
                        <p>Away from the hurly-burly of life, encounter a getaway in Pakistan, which makes you want more of the stupendous panoramas, it offers.</p>
                    </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 col-lg-4 mb-4" data-aos="fade-up">
                        <div class="d-block ftco-img-flaticon">
                            <img src="/fonts/flaticon/svg/001-breakfast.svg" alt="Free Template by Free-Template.co" class="img-fluid mb-4"/>
                            <h3>Good Foods</h3>
                            <p>Pakistan, a soil known for its herbs and spices, has an unparalleled melange of foods. From desserts to mountains, every single traditional food has its own profound history. </p>
                        </div>
                        </div>
                        <div class="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="100">
                        <div class="d-block ftco-img-flaticon">
                            <img src="/fonts/flaticon/svg/002-planet-earth.svg" alt="Free Template by Free-Template.co" class="img-fluid mb-4"/>
                            <h3>Travel Anywhere</h3>
                            <p>From discovering the historic vicinages of the south to expriencing the entrancing vistas of the north, travel it ALL! </p>
                        </div>
                        </div>
                        <div class="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="200">
                        <div class="d-block ftco-img-flaticon">
                            <img src="/fonts/flaticon/svg/003-airplane.svg" alt="Free Template by Free-Template.co" class="img-fluid mb-4"/>
                            <h3>Travel Mode</h3>
                            <p>Take an airbus or a roadbus.
                            Board a chairlift to wander through the mountains or mount a rickshaw to meander through the cities.YOU make the call!</p>
                        </div>
                        </div>
                        <div class="col-md-4 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="300">
                            <div class="d-block ftco-img-flaticon">
                                <img src="/fonts/flaticon/svg/004-beach.svg"  class="img-fluid mb-4"/>
                                <h3>Seashore</h3>
                                <p>Take a day-trip or reserve a personal cabana at your chosen seaside. Have fun cruising or plan a cookout with your pals!  </p>
                            </div>
                            </div>
                            <div class="col-md-4 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="400">
                            <div class="d-block ftco-img-flaticon">
                                <img src="/fonts/flaticon/svg/005-mountains.svg"  class="img-fluid mb-4"/>
                                <h3>Hills</h3>
                                <p>Indulge in the riveting and tranquil mornings at the mountaintops or be a wayfarer and hike across the mountains. </p>
                            </div>
                            </div>
                            <div class="col-md-2 col-lg-2 mb-4" data-aos="fade-up" data-aos-delay="500">
                        </div>
                    </div>
                </section>
            </div>
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

