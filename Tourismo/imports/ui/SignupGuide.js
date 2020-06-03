import React, { Component } from 'react';
import '../api/accounts.js';

class SignupGuide extends Component {
    onSubmit(event) {
        const fields = {
            name: this.refs.name.value,
            age: this.refs.age.value,
            phone: this.refs.phone.value,
            cnic: this.refs.cnic.value,
            address: this.refs.address.value,
            experience: this.refs.experience.value,
            expertise: this.refs.expertise.value,
            city: this.refs.city.value,
        };

        event.preventDefault();
        const userId = Meteor.user()._id
        Meteor.call('user.addFields', userId, fields);
        this.props.history.push("../")
    }

    render() {
        document.getElementById('only-home').innerHTML = '<span></span>';
        return(
            <div>
                <h1>Signup as Guide to continue</h1>
            
                <div id='sign-up-form'>
                    <form className="new-trip" onSubmit={this.onSubmit.bind(this)} >
                        Full Name: 
                            <input type="text" ref="name" placeholder="Enter your full name"/>
                        Age:
                            <input type="number" ref="age" placeholder="Enter your age"/>
                        Phone Number:
                            <input type="number" ref="phone" placeholder="Enter your phone number"/>
                        Cnic Number: 
                            <input type="number" ref="cnic" placeholder='Enter your CNIC number'/>
                        Address:
                            <input type="text" ref="address" placeholder="Enter your address"/>
                        City: 
                            <input type="text" ref="city" placeholder="Enter your city"/>
                        Experience:
                            <input type="text" ref="experience" placeholder="Enter your past experience related to this"/>
                        Expertise: 
                            <input type="text" ref="expertise" placeholder="Enter the places that you know about and that you can help the tourist to explore"/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div className='clear-end'></div>
            </div>
        );
    };
};
export default (SignupGuide);