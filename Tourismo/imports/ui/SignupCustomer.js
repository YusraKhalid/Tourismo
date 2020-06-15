import React, { Component } from 'react';
import '../api/accounts.js';

class SignupCustomer extends Component {
    onSubmit(event) {
      event.preventDefault();
        const fields = {
            name: this.refs.name.value,
            age: this.refs.age.value,
            phone: this.refs.phone.value,
            cnic: this.refs.cnic.value,
        };
        // for email verification:    https://docs.meteor.com/api/passwords.html#Accounts-createUser
        
        const userId = Meteor.user()._id
        // console.log('Fields: ', fields);
        Meteor.call('user.addFields', userId, fields);
        window.location.pathname = '/';
    }

    render() {
      // console.log("opened");
        // document.getElementById('only-home').innerHTML = '<span></span>';
        document.getElementById('home-description').innerText = "";
        document.getElementById('home-trips').innerHTML = ''
        document.getElementById('scroll-down').innerHTML = '';
        return(
            <div>
            <section className="section contact-section">
                <div className="row" data-aos="fade-up">
                        <div className="col-md-3  col-lg-3 col-sm-3 col-xs-3 ">
                  </div>
                  <div className="col-md-6  col-lg-6 col-sm-6 col-xs-6 ">
                    
                    <form action="#" method="post" className="border border-primary bg-white p-md-5 p-4 mb-5" onSubmit={this.onSubmit.bind(this)}>
                      <div className="row">
                        <div className="col-md-12  col-lg-12 col-sm-12 col-xs-12  form-group">
                          <input type="text" ref="name" placeholder="Full Name" className="form-control " />
                        </div>
                            </div>
                        <div className="row">
                        <div className="col-md-12  col-lg-12 col-sm-12 col-xs-12  form-group">
                          <input type="text" ref="age" placeholder="Age" className="form-control " pattern="[0-9]*"/>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12  col-lg-12 col-sm-12 col-xs-12  form-group">
                        <input type="tel" ref="phone" placeholder="Phone#" className="form-control "/>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12  col-lg-12 col-sm-12 col-xs-12  form-group">
                        <input type="number" ref="cnic" placeholder="CNIC or SSN #" className="form-control "/>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6  col-lg-6 col-sm-6 col-xs-6 form-group">
                          <input type="submit" value="Sign Up" className="btn btn-primary"/>
                        </div>
                      </div>
                    </form>
                  </div>
                          <div className="col-md-3  col-lg-3 col-sm-3 col-xs-3">
                  </div>
                  
                </div>
            </section>
                        
            </div>
        );
    };
};
export default (SignupCustomer);