import React, { Component } from 'react';
import {HomeLinks} from '../api/home.js'

class Login extends Component {
    onSubmit(event) {
        event.preventDefault();
        const username = this.refs.username.value;
        const password = this.refs.password.value;

        Meteor.loginWithPassword(username, password, (error) => {
            if (error) {
                console.log("Got error: ", error);
            } else {
                console.log("successful");
                window.location.pathname = '/';
            }
        });
      }

    render() {
        document.getElementById('only-home').innerHTML = '<span></span>';
        document.getElementById('home-description').innerText = "";
        document.getElementById('home-trips').innerHTML = ''
        document.getElementById('scroll-down').innerHTML = '';
        return(
            <div>
            <section className="section contact-section">
      <div className="container-contact">
            
        <div className="row">
        <div className="col-md-2 col-lg-2 col-sm-2 col-xs-2">


          </div>
          <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4" data-aos="fade-right">
            <h1 >Log in to Tourismo</h1>
            <p><img src="/img/logo.png" className="img-fluid"/> 
                    </p>

          </div>
           <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1">
          </div>
          <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4" data-aos="fade-left">
            <form action="#" method="post" className="bg-white p-md-5 p-4 mb-5 border border-primary" onSubmit={this.onSubmit.bind(this)}>
              <div className="row">
                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group">
                  <input type="text" ref="username" className="form-control " placeholder="Username"/>
                </div>
                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group">
                <input type="password" ref="password" className="form-control " placeholder="Password"/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6 form-group">
                <button type="submit" className="btn btn-primary" >Log In</button>
                </div>
              </div>
            <div className="row">
                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group">
                <p>Not a User?</p>
                </div>
              </div>
            <div className="row">
                <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6 form-group">    
               <a className="btn btn-primary" href='../signup'>Sign Up</a>
                </div>
                </div>
            </form>

          </div>
          
        </div>
      </div>
    </section>

            </div>
        );
    };
};
export default Login
