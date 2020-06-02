import React, { Component } from 'react';
import '../api/accounts.js';

class SignupCustomer extends Component {
    onSubmit(event) {
        const fields = {
            name: this.refs.name.value,
            age: this.refs.age.value,
            phone: this.refs.phone.value,
            city: this.refs.city.value,
            cnic: this.refs.cnic.value,
        };
        // for email verification:    https://docs.meteor.com/api/passwords.html#Accounts-createUser
        event.preventDefault();
        const userId = Meteor.user()._id
        Meteor.call('user.addFields', userId, fields);
        this.props.history.push("../")
      }

    render() {
        return(
            <div>
                <h1>Signup as Tourist to continue</h1>
            
                <div id='sign-up-form'>
                    <form className="new-trip" onSubmit={this.onSubmit.bind(this)} >
                        Full Name: 
                        <input type="text" ref="name" placeholder="Enter your full name"/>
                        Age:
                        <input type="number" ref="age" placeholder="Enter your age"/>
                        Phone Number:
                        <input type="number" ref="phone" placeholder="Enter your phone number"/>
                        City: 
                        <input type="text" ref="city" placeholder="Enter your city"/>
                        Cnic Number: 
                        <input type="number" ref="cnic"/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    };
};
export default (SignupCustomer);