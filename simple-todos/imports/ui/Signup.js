import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import '../api/accounts.js';


class Signup extends Component {
    onSubmit(event) {

        event.preventDefault();
        console.log("lala");

        // var password_error = false;

        if (this.refs.password.value!=this.refs.passwordRepeat.value){
            console.log("Error: Password do not matck");
            this.refs.incorrectPassword.replaceWith("Passwords do not match");
            
        }
        else{
        // Find the text field via the React ref
        const userdata = {
            username: this.refs.username.value,
            email: this.refs.email.value,
            password: this.refs.password.value,
            // passwordRepeat: this.refs.passwordRepeat.value,
            //age: this.refs.age.value
            //profile: {
            //        age: this.refs.age.value
            //    }
        };
        // for email verification:    https://docs.meteor.com/api/passwords.html#Accounts-createUser

        // Meteor.call('login.signup', userdata);

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

        Accounts.createUser(userdata, (error) => {
            if (error) {
                console.log("Got error: ", error);
            } else {
                console.log("successful", Meteor.user()._id );
                //addAdditionalFields();
                // this.props.history.push('/SignupContinue');
                redirect(role);
                Meteor.call('user.role', Meteor.user()._id , role);
                //this.props.history.push('/DisplayTrips');
            }
        });
    };
      }

    render() {
        //const { url } = this.props.match
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
                        <span ref='incorrectPassword'></span>
                        {/* {this.refs.password!=this.refs.passwordRepeat ? 
                        <div> password do not match</div>
                        : <div>Password match</div> } */}
                        {/* Age: 
                        <input type="number" ref="age"/> */}
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    };
};
export default Signup
