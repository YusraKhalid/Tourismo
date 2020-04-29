import React, { Component } from 'react';

class Account extends Component {
    // signin(event) {
    //     this.props.history.push('/Login');
    // };
    signout(event){
        console.log("signout")
        Meteor.logout()
      }

    render() {
        if (Meteor.userId()){
        return(
            <div>
                <button onClick={this.signout.bind(this)}>Sign out</button>
            </div>
        );}
        else{
        return(
            <div>
                <a href='/Login'><button>Sign In</button></a>
            </div>
        );}

            
    };
};
export default Account
