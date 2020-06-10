import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import '../api/accounts.js';


class Signup extends Component {
    onSubmit(event) {
        event.preventDefault();
        if (this.refs.password.value!=this.refs.passwordRepeat.value){
            console.log("Error: Password do not match");
            this.refs.incorrectPassword.replaceWith("Passwords do not match");
        }
        else {

            const redirect = (role) => {
                if (role == "customer"){
                    this.props.history.push('/SignupCustomer');
                };
                if (role == "company"){
                    this.props.history.push('/SignupCompany');
                };
                if (role == "guide"){
                    this.props.history.push('/SignupGuide');
                };
            }
            const role = this.refs.role.value;
            const userdata = {
                username: this.refs.username.value,
                email: this.refs.email.value,
                password: this.refs.password.value,
            };
            var input = document.getElementById("image");
            var fReader = new FileReader();
            fReader.readAsDataURL(input.files[0]);
            fReader.onloadend = function(event){
                userdata.profile = {
                    dp: event.target.result
                }
            
            //     Meteor.call('trips.insert', trip, event.target.result);      
            //   }   
                userdata.image = event.target.result;
                console.log("Userdata: ", userdata);
                Accounts.createUser(userdata, (error) => {
                    if (error) {
                        console.log("Got error: ", error);
                        this.refs.invalidUsername.replaceWith(error);
                    } else {
                        console.log("successful", Meteor.user()._id );
                        // Meteor.loginWithPassword(username, password, (error) => {
                        //     if (error) {
                        //         console.log("Got error: ", error);
                        //     }
                        //     });
                        redirect(role);
                        Meteor.call('user.role', Meteor.user()._id , role);
                    }
                });
        };
    }
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
            <h1 className="center-text" >Create a new account</h1>
            <div className="center-text">
            <p><img src="/img/logo.png" alt="Free Template by Free-Template.co" className="img-fluid"/> 
                    </p></div>

          </div>
           <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1">


          </div>
          <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4" data-aos="fade-left">
            
            <form action="#" method="post" className="bg-white p-md-5 p-4 mb-5" onSubmit={this.onSubmit.bind(this)} >
              <div className="row">
                <div className="col-md-12 form-group">
                {/* Choose role<br/>
                <input type="radio" ref="role" id="vehicle1" value="customer"/>
                <img width='28%'  src='/images/tourist.jpg'/>
                <input type="radio" ref="role" id="vehicle2" value="company"/>
                <img width='28%' src='/images/company.jpg'/>
                <input type="radio" ref="role" id="vehicle3" value="guide"/>
                <img width='28%' src='/images/guide.jpg'/> */}
                        <select ref="role" className="form-control ">
                        <option value="" disabled selected>Choose role</option>
                            <option value="customer">Tourist</option>
                            <option value="company">Company</option>
                            <option value="guide">Tour guide</option>
                        </select>              
                </div>
                <div className="col-md-12 form-group">
                <input type="text" ref="username" placeholder="Username" className="form-control " />
                </div>
                <div className='col-md-12 form-group error'>
                        <span ref='invalidUsername'></span></div>
              </div>
          
              <div className="row">
                <div className="col-md-12 form-group">
                  <input type="email" ref="email" placeholder="Email" className="form-control"/>
                </div>
              </div>
               
               <div className="row">
                <div className="col-md-12 form-group">
                  <input type="password" ref="password" placeholder="Password" className="form-control"/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 form-group">
                  <input type="password" ref="passwordRepeat" placeholder="Password Again" className="form-control"/>
                </div>
              <div className='col-md-12 form-group error'>
                        <span ref='incorrectPassword'></span></div>
              
                <div className="col-md-12 form-group">
                  <label className="text align-self-center">Upload Profile Picture:</label>
                    
                        <input type="file" id="image" ref="picture" accept="image/*"/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <input type="submit" value="Sign Up" className="btn btn-primary"/>
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
export default Signup
