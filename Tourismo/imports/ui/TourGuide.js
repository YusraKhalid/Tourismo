import React, { Component } from 'react';
import {GuideBookings, AcceptedRequests} from '../api/guide.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Account from './Account';
import { render } from 'react-dom';
// import {HomeLinks} from '../api/home.js'


class TourGuide extends Component {

    handleAccept(){
        var accept = confirm("Sure you want to accept this?");
        if( accept == true ) {
        // alert("Sure you want to accept") (
            console.log("accepted", this._id);
            Meteor.call('guideBookings.accept', this._id);
        }
    }

    renderBookings(bookings){
        // const bookings = this.props.guideBookings;
        return(bookings.map((booking)=>{
            const cost = booking.days * 1000 + booking.hours * 300;
            return(
                    <tr><td>
                    <div className='booking' >
                        <center><h5>{booking.destination}</h5></center>
                        destination: <b><span className='trip-data'>{booking.destination}</span></b> <br/>
                        Cost: <span className='trip-data'>{cost} </span> <br/>
                        Days: <b><span className='trip-data'>{booking.days}</span></b><br/>
                        hours: <b><span className='trip-data'>{booking.hours}</span></b><br/>
                        Date: <b><span className='trip-data'>{booking.date}</span></b><br/>
                        departure: <b><span className='trip-data'>{booking.departure}</span></b><br/>
                        {booking.pickup? <div>Pickup: <b><span className='trip-data'>{booking.pickup} </span> </b> </div> :""}
                        additionalInformation: <b><span className='trip-data'>{booking.additionalInformation}</span></b><br/>
                        <div className='accept' float='left'>
                            <button type='button' onClick={this.handleAccept.bind(booking)}>Accept Offer</button>
                        </div>
                    </div>
                    </td></tr>
                )
            })
        )
    }

    renderOtherBookings(bookings){
        // const bookings = this.props.guideBookings;
        return(bookings.map((booking)=>{
            const cost = booking.days * 1000 + booking.hours * 300;
            return(
                <div className='bookings-others'>
                    <table className=' mytable other-table table'>
                        <tbody>
                            <tr><td>
                            <div className='booking' >
                                <center><h5>{booking.destination}</h5></center>
                                destination: <b><span className='trip-data'>{booking.destination}</span></b> <br/>
                                Cost: <span className='trip-data'>{cost} </span> <br/>
                                Days: <b><span className='trip-data'>{booking.days}</span></b><br/>
                                hours: <b><span className='trip-data'>{booking.hours}</span></b><br/>
                                Date: <b><span className='trip-data'>{booking.date}</span></b><br/>
                                departure: <b><span className='trip-data'>{booking.departure}</span></b><br/>
                                {booking.pickup? <div>Pickup: <b><span className='trip-data'>{booking.pickup} </span> </b> </div> :""}
                                additionalInformation: <b><span className='trip-data'>{booking.additionalInformation}</span></b><br/>
                            </div>
                            </td></tr>
                        </tbody>
                        <div className='accept accept-other' float='left'>
                                    <button type='button' onClick={this.handleAccept.bind(booking)}>Accept Offer</button>
                                </div>
                    </table>
                </div>
            )
        })
        )
    }

    renderAcceptedRequests(){
        const acceptedRequests = this.props.acceptedRequests;
        return(acceptedRequests.map((acceptedRequest)=>{
            const cost = acceptedRequest.days * 1000 + acceptedRequest.hours * 300;
            return(
                <tr><td>
                <div className='acceptedRequest' >
                    Your accepted request is by <b>{acceptedRequest.customer_name}</b><br/>
                    The Contact Number is <b>{acceptedRequest.customer_phone}</b><br/>
                    For the following booking<br/>
                    <div>
                    destination: <b><span className='trip-data'>{acceptedRequest.destination}</span></b> <br/>
                    Cost: <span className='trip-data'>{cost} </span> <br/>
                    Days: <b><span className='trip-data'>{acceptedRequest.days}</span></b><br/>
                    hours: <b><span className='trip-data'>{acceptedRequest.hours}</span></b><br/>
                    Date: <b><span className='trip-data'>{acceptedRequest.date}</span></b><br/>
                    {acceptedRequest.departure? <div>departure: <b><span className='trip-data'>{acceptedRequest.departure}</span></b><br/></div> :""}
                    {acceptedRequest.pickup? <div>Pickup: <b><span className='trip-data'>{acceptedRequest.pickup} </span> </b> </div> :""}
                    additionalInformation: <b><span className='trip-data'>{acceptedRequest.additionalInformation}</span></b><br/>
                    </div>
                </div>
                </td></tr>
            )
        })
        )
    }

    getMatching(){
        // event.preventDefault();
        console.log("get matching:", Meteor.userId());
        Meteor.call('guideBookings.matching', Meteor.userId(), (error, result) => {
            console.log('error: ', error);
            if (error) {
                console.log("Error ", error);
            }
            console.log('result: ', result);
            render(<div><center>
                        <h3>Requests for You</h3>
                        <table className='mytable table table-striped'>
                            <tbody>
                                {this.renderBookings(result)}
                            </tbody>
                        </table>
                    </center></div>
                ,
                document.getElementById('matching')
            );
         });
    }

    render() {
        render(<div>
            <Account /><br/>
            </div>,
            document.getElementById('signin')
            );
        // const requiredLink = this.props.homeLink;
        // if (requiredLink){
        //     render(<li><a href={'../'+requiredLink.link}>{requiredLink.text}</a></li>,
        //         document.getElementById('link')
        //         );
        // }
        document.getElementById('only-home').innerHTML = '<span></span>';
        document.getElementById('home-description').innerText = "";
        document.getElementById('home-trips').innerHTML = ''
        document.getElementById('scroll-down').innerHTML = '';
        return(
            <div>
                <h1><center>Tour Guide</center></h1>
                <section className="section contact-section bg-light-2">
                <div className='bookings-accepted'>
                    {/* <section className="section contact-section"> */}
                        {/* <div className="container-contact"> */}
                            <div className="row-contact">
                                <div data-aos="fade-up">
                                    <center><h3>Accepted Requests</h3>
                                        <table className='mytable table table-striped'>
                                            <tbody>
                                                {this.renderAcceptedRequests()}
                                            </tbody>
                                        </table>
                                    </center>
                                </div>
                            {/* </div> */}
                        </div>
                    {/* </section> */}
                </div>
                <div className='bookings-special'>
                    {/* <section className="section contact-section"> */}
                        {/* <div className="containesr-contact"> */}
                            <div className="row-contact">
                                <div className='matching' data-aos="fade-up">
                                            {this.getMatching()}
                                            {/* <td><tr> */}
                                            <span id='matching'></span>
                                            {/* </tr></td> */}
                                </div>
                            </div>
                        {/* </div> */}
                    {/* </section> */}
                </div>
                
                <div className='clear-end'></div>
                </section>
                <section className="section contact-section">
                    <center><h3>Other requests Available</h3>
                    {/* <table className='mytable table table-striped'>
                            <tbody> */}
                            <div className='all-other-requests'>
                                {this.renderOtherBookings(this.props.guideBookings)}
                            </div>
                            {/* </tbody>
                        </table> */}
                    </center>
                </section>
                <div className='clear-end'></div>
            </div> 
        )
    };
};
export default withTracker(() => {
    Meteor.subscribe('guideBookings');
    Meteor.subscribe('acceptedRequests');
    // Meteor.subscribe('homeLinks');
    return {
        // homeLink: HomeLinks.findOne({}),
        guideBookings: GuideBookings.find({owner: { $ne: Meteor.userId() }}, { sort: { createdAt: 1 } }).fetch(),
        acceptedRequests: AcceptedRequests.find({}, { sort: { createdAt: 1 } }).fetch(),
        currentUser: Meteor.user(),
    };
  })(TourGuide);
