import React, { Component } from 'react';

class Login extends Component {
    onSubmit(event) {
        // event.preventDefault();
        console.log("login");
        event.preventDefault();

        // Find the text field via the React ref
        const username = this.refs.username.value;
        const password = this.refs.password.value;

        Meteor.loginWithPassword(username, password, (error) => {
            if (error) {
                console.log("Got error: ", error);
            } else {
                console.log("successful");
                this.props.history.push('/');
            }
        });
      }

    render() {
        //const { url } = this.props.match
        return(
            <div>
                <h1>Login to continue</h1>
                <div>
                    <h3>Not a User?
                        <a href='/signup'>signup</a>
                    </h3>
                </div>
            
                <div id='sign-in-form'>
                    <form className="sign-in" onSubmit={this.onSubmit.bind(this)} >
                        Username:
                        <input type="text" ref="username" placeholder="Enter your name"/> <br/>
                        Password:
                        <input type="password" ref="password" placeholder="Enter your password"/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    };
};
export default Login
