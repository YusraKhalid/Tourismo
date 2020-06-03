import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import '../api/accounts.js';


class Signup extends Component {
    onSubmit(event) {
        event.preventDefault();
        if (this.refs.password.value!=this.refs.passwordRepeat.value){
            console.log("Error: Password do not matck");
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
        return(
            <div>
                <h1>Login to continue</h1>
            
                <div id='sign-up-form'>
                    <form className="new-trip" onSubmit={this.onSubmit.bind(this)} >
                        Register As:
                        <select ref="role">
                            <option value="customer">Tourist</option>
                            <option value="company">Company</option>
                            <option value="guide">Tour guide</option>
                        </select>
                        Username:
                        <input type="text" ref="username" placeholder="Enter your name"/><br/>
                        Email:
                        <input type="email" ref="email" placeholder="Enter your email"/><br/>
                        Password:
                        <input type="password" ref="password" placeholder="Enter your password"/><br/>
                        Password Again: 
                        <input type="password" ref="passwordRepeat" placeholder="Enter your password again"/><br/>
                        <div className='error'>
                        <span ref='incorrectPassword'></span></div><br/>
                        Upload your profile picture:  
                        <input
                        type="file"
                        id="image"
                        ref="picture"
                        accept="image/*"
                        /><br/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div className='clear-end'></div>

            </div>
        );
    };
};
export default Signup
