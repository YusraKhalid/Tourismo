import React, { Component } from 'react';
import '../api/accounts.js';

class SignupCompany extends Component {
    onSubmit(event) {
        const fields = {
            name: this.refs.name.value,
            phone: this.refs.phone.value,
            address: this.refs.address.value,
            cnic: this.refs.cnic.value,
            link: this.refs.link.value,
            company: this.refs.company.value,
            city: this.refs.city.value,
            license: this.refs.license.value,
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
                <h1>Signup as Company to continue</h1>
                <div id='sign-up-form'>
                    <form className="new-trip" onSubmit={this.onSubmit.bind(this)} >
                        Full Name: 
                        <input type="text" ref="name" placeholder="Enter your full name"/>
                        Contact Number:
                        <input type="number" ref="phone" placeholder="Enter your Phone number"/><br/>
                        Address
                        <input type="text" ref="address" placeholder="Enter your address"/><br/>
                        CNIC Number:
                        <input type="number" ref="cnic" placeholder="Enter your CNIC number"/><br/>
                        Company Name:
                        <input type="text" ref="company" placeholder="Enter your company name"/><br/>
                        City: 
                        <input type="text" ref="city" placeholder="Enter your city"/><br/>
                        License Number: 
                        <input type="number" ref="license"/><br/>
                        Website or Social media profile link:
                        <input type="text" ref="link" placeholder="Enter your profile link"/><br/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    };
};
export default (SignupCompany);