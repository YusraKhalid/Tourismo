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
        <div className="col-md-2">


          </div>
          <div className="col-md-4" data-aos="fade-right">
            <h1 >Log in to Tourismo</h1>
            <p><img src="/img/logo.png" alt="Free Template by Free-Template.co" className="img-fluid"/> 
                    </p>

          </div>
           <div className="col-md-1">


          </div>
          <div className="col-md-4" data-aos="fade-left">
            
            <form action="#" method="post" className="bg-white p-md-5 p-4 mb-5" onSubmit={this.onSubmit.bind(this)}>
              <div className="row">
                <div className="col-md-12 form-group">
                  <input type="text" ref="username" className="form-control " placeholder="Enter username"/>
                </div>
                <div className="col-md-12 form-group">
                <input type="password" ref="password" className="form-control " placeholder="Enter your password"/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group">
                <button type="submit" className="btn btn-primary" >Log In</button>
                </div>
              </div>
            <div className="row">
                <div className="col-md-6 form-group">
                <p>Not a User?</p>
                </div>
              </div>
            <div className="row">
                <div className="col-md-6 form-group">    
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
