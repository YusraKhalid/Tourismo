import React, { Component } from 'react';
import '../api/accounts.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Account from './Account';
import { render } from 'react-dom';
import {HomeLinks} from '../api/home.js'

class Contact extends Component {
    
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
        document.getElementById('only-home').innerHTML = '<span></span>';
        document.getElementById('home-description').innerText = "";
        document.getElementById('home-trips').innerHTML = ''
        document.getElementById('scroll-down').innerHTML = '';
        return(
            <div>
              {/* <section class="site-hero overlay page-inside"> */}
                    {/* <div class="container"> */}
                      {/* <div class="row site-hero-inner justify-content-center align-items-center"> */}
                        {/* <div class=" text-center"> */}
                            {/* <h1 class="heading" data-aos="fade-up">Contact Us</h1> */}
                        {/* </div> */}
                      {/* </div> */}
                  {/* </div> */}
                {/* </section> */}
            <section className="section contact-section">
            {/* <div class="site-hero-inner justify-content-center align-items-center"> */}
              
              {/* </div> */}
              <center>
                <h1 className='title' data-aos="fade-up">Contact Us</h1>
                <div className='contact'>
                  <h5 className='fields-left'>
                    Email Address:
                  </h5> <br/>
                  <p><b>tourismopk@gmail.com</b></p>

                  <h5 className='fields-left'>
                    Phone Number:
                  </h5> <br/>
                  <p><b>03229773786</b></p>
                  <p><b>03229274746</b></p>
                  
                  <h5 className='fields-left'>
                    Address:
                  </h5> <br/>
                  <p><b>School of Electrical Engineering, NUST, H-12 <br/> Islamabad</b></p>
                </div>
              </center>
              


              {/* <div className="container-contact">

                <div className="row">
                <div className="col-md-3 col-lg-3 col-sm-3 col-xs-3">
                  </div>
                  <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6" data-aos="fade-up">
                    
                      Blah blah blah

                  </div>
                <div className="col-md-3 col-lg-3 col-sm-3 col-xs-3">
                  </div>
                  
                </div>
              </div> */}
            </section>
                

            </div>
        );
    };
};
export default withTracker(() => {
  Meteor.subscribe('homeLinks');
  return {
      homeLink: HomeLinks.findOne({}),
      currentUser: Meteor.user(),
  };
})(Contact);
