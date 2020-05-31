import React, { Component } from 'react';

class Home extends Component {
    render() {
        //const { url } = this.props.match
        return(
            <div><center>
                <h2 font = 'arial'>Welcome to Tourismo.<br/>
                How may we help you?<br/>
                Are you: <br/>
                <ul className='home'>
                    <li>
                        <a href="TripCompany">Trip Organizer</a>
                    </li>
                    <li>
                        <a href="TourGuide">Tour Guide</a>
                    </li>
                    <li>
                        <a href="DisplayTrips">Looking for Trips</a>
                    </li>
                    <li>
                        <a href="BookGuide">Looking for a Tour Guide</a>
                    </li>
                </ul>
                </h2>
                </center>
            </div> 
        )
    };
};
export default Home
