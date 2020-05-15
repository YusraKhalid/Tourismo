import React, { Component } from 'react';
import '../api/accounts.js';
import { withTracker } from 'meteor/react-meteor-data';


class Account extends Component {
    signout(event){
        console.log("signout")
        Meteor.logout()
        return(
            <div>
                <a href='/Login'><button>Sign In</button></a>
            </div>
        )
      }
    render() {
        if (this.props.currentUser){
            const user = this.props.currentUser.username;
            // const user = Meteor.users(_id=Meteor.userId())
            console.log('user', user);
        return(
            <div align='right'>
                <h5>{user}</h5>
                <button onClick={this.signout.bind(this)}>Sign out</button>
            </div>
        );}
        else{
        return(
            <div align='right'>
                <a href='/Login'><button>Sign In</button></a>
            </div>
        );}

    };
};
export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
  })(Account);
