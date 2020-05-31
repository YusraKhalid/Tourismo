import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {HomeLinks} from '../api/home.js'


class Home extends Component {
    render() {
        const requiredLink = this.props.homeLink;
        console.log("Links: ", requiredLink);
        return(
            <div><center>
                <h2 font = 'arial'>Welcome to Tourismo.<br/>
                How may we help you?<br/>
                Are you: <br/>
                <ul className='home'>
                    <li>
                        <a href="DisplayTrips">Looking for Trips</a>
                    </li>
                    <li>
                    {requiredLink ? <a href={requiredLink.link}>{requiredLink.link}</a> : ""}
                    </li>
                </ul>
                
                </h2>
                </center>
            </div> 
        )
    };
};
export default withTracker(() => {
    Meteor.subscribe('homeLinks');
    return {
        homeLink: HomeLinks.findOne({}),
    };
  })(Home);

