import React, { Component } from 'react';
import '../api/accounts.js';
import { withTracker } from 'meteor/react-meteor-data';


class Account extends Component {
    signout(event){
        console.log("signout")
        Meteor.logout()
        document.getElementById('link').innerHTML = '';
        return(
            <div>
                <a href='../Login'><button>Sign In</button></a>
            </div>
        )
      }
    render() {
        
        if (this.props.currentUser){
            const user = this.props.currentUser.username;
            const profile = this.props.currentUser.profile;
            // console.log("user", this.props.currentUser);
        return(
            <div align='right' className='animated fadeInDownBig'>
                <h5>{profile?<img className='dp' src={profile.dp}></img>:""}<br/><div className='username'>{user}</div></h5>
                <button className='sign-button' onClick={this.signout.bind(this)}>Sign out</button>
            </div>
        );}
        else{
        return(
            <div align='right'>
                <a href='../Login' className='sign-button'><button>Sign In</button></a>
            </div>
        );}

    };
};
export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
  })(Account);
