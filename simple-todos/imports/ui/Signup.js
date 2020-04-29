import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

class Signup extends Component {
    onSubmit(event) {
        // event.preventDefault();
        console.log("lala");
        
        // Find the text field via the React ref
        const userdata = {
            username: this.refs.username.value,
            email: this.refs.email.value,
            password: this.refs.password.value,
            passwordRepeat: this.refs.passwordRepeat.value,
            profile: {
                    age: this.refs.age.value
                }
        };
        // for email verification:    https://docs.meteor.com/api/passwords.html#Accounts-createUser

        // Meteor.call('login.signup', userdata);

        Accounts.createUser(userdata, (error) => {
            if (error) {
                console.log("Got error: ", error);
            } else {
                console.log("successful");
                this.props.history.push('/DisplayTrips');
            }
        });
        event.preventDefault();

        // // Clear form
        // this.refs.destination.value = '';
        // this.refs.days.value = '0';
        // this.refs.startDate.value = '';
        // this.refs.endDate.value = '';
        // this.refs.image.value = '';
        // this.refs.departure.value = '';
        // this.refs.destinationInformation.value = '';
      }

    render() {
        //const { url } = this.props.match
        return(
            <div>
                <h1>Login to continue</h1>
            
                <div id='sign-up-form'>
                    <form className="new-trip" onSubmit={this.onSubmit.bind(this)} >
                        Username:
                        <input type="text" ref="username" placeholder="Enter your name"/>
                        Email:
                        <input type="email" ref="email" placeholder="Enter your email"/>
                        Password:
                        <input type="password" ref="password" placeholder="Enter your password"/>
                        Staring Date: 
                        <input type="password" ref="passwordRepeat" placeholder="Enter your password again"/>
                        Age: 
                        <input type="number" ref="age"/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    };
};
export default Signup
