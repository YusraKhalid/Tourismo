import React, { Component } from 'react';
import {GuideBookings, AcceptedRequests} from '../api/guide.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Account from './Account';
import {HomeLinks} from '../api/home.js'
import { render } from 'react-dom';


class BookGuide extends Component {

    handleSubmit(event) {
        event.preventDefault();
        const today = new Date();
        // Find the text field via the React ref
        const guide = {
            userId: Meteor.userId(),
            destination : this.refs.destination.value,
            days : this.refs.days.value,
            hours : this.refs.hours.value,
            date : this.refs.date.value,
            departure : this.refs.departure.value,
            additionalInformation : this.refs.additionalInformation.value,
        };
        var flag = true;
        const date = new Date(guide.date);
        if (today > date){
          flag = false;
          this.refs.incorrectDate.replaceWith("Enter the future date");
        }
        if ((guide.days < 0) & (guide.hours<0)){
          flag = false
          this.refs.incorrectDays.replaceWith('Enter valid number of days or hours');
        }
        if (flag == true){
            Meteor.call('guideBookings.book', guide);      
        }
    
        // Clear form
        this.refs.destination.value = '';
        this.refs.days.value = '0';
        this.refs.date.value = '';
        this.refs.hours.value = '';
        this.refs.departure.value = '';
        this.refs.additionalInformation.value = '';
      }  
    handleRemove(){
        alert("Sure you want to remove this?") (
        Meteor.call('guideBookings.remove', this._id));
    }

    renderBookings(){
        const bookings = this.props.guideBookings;
        return(bookings.map((booking)=>{
            return(
                <div className='booking'>
                    <div className='delete'>
                        <button type='button' onClick={this.handleRemove.bind(booking)}>x</button>
                    </div>
                    destination:<b>{booking.destination}</b> <br/>
                    Days:<b>{booking.days}</b><br/>
                    hours:<b>{booking.hours}</b><br/>
                    Date:<b>{booking.date}</b><br/>
                    departure:<b>{booking.departure}</b><br/>
                    additionalInformation:<b>{booking.additionalInformation}</b><br/>
                </div>
            )
        })
        )
    }

    renderAcceptedRequests(){
        const acceptedRequests = this.props.acceptedRequests;
        return(acceptedRequests.map((acceptedRequest)=>{
            return(
                <div className='acceptedRequest' >
                    Your Request has been Accepted by <b>{acceptedRequest.guide_name} </b> 
                     who is<b> {acceptedRequest.guide_age} </b>years old and lives in {acceptedRequest.guide_city}<br/>
                    The Contact Number is <b>{acceptedRequest.guide_phone}</b><br/>
                    CNIC Number is <b>{acceptedRequest.guide_cnic}</b><br/>
                    For the following booking<br/>
                    <div>
                    destination:<b>{acceptedRequest.destination}</b> <br/>
                    Days:<b>{acceptedRequest.days}</b><br/>
                    hours:<b>{acceptedRequest.hours}</b><br/>
                    Date:<b>{acceptedRequest.date}</b><br/>
                    departure:<b>{acceptedRequest.departure}</b><br/>
                    additionalInformation:<b>{acceptedRequest.additionalInformation}</b><br/>
                    </div>
                </div>
            )
        })
        )
    }

    render() {
        console.log("accepted requests:", this.props.acceptedRequests);
        render(<div>
            <Account /><br/>
          </div>,
          document.getElementById('signin')
          );
          const requiredLink = this.props.homeLink;
        if (requiredLink){
            render(<li><a href={'../'+requiredLink.link}>{requiredLink.text}</a></li>,
                document.getElementById('link')
                );
        }
        document.getElementById('only-home').innerHTML = '<span></span>';
        return(
            <div>
                <div>{this.props.acceptedRequests[0] ? 
                <center><h3>Your Following Requests are accepted</h3></center>:""}
                <ul>
                    {this.renderAcceptedRequests()}
                </ul>
                {this.props.guideBookings[0] ?
                <center><h3>Pending Requests</h3></center> :""}
                <ul>
                    {this.renderBookings()}
                </ul>
                </div>
                <div>
                   <center><h1>Book Tour Guide</h1></center>
                    { Meteor.userId() ?
                    <center>
                        <form className="hire-guide" onSubmit={this.handleSubmit.bind(this)} >
                            <div className='form-field'>Destination that you want to explore:</div>
                            <input
                            type="text"
                            ref="destination"
                            placeholder="Type to add desination"
                            /> <br/><br/>
                            <div className='form-field'>Number of Days you want to hire guide for:</div> 
                            <input
                            type="number"
                            ref="days"
                            placeholder="Type to add number of days"
                            /><br/><br/> <div className='form-field'>
                            Except for the number of days mentioned above enter the hours you want to hire guide for (days+hours = total time):</div> 
                            <input
                            type="number"
                            ref="hours"
                            placeholder="Type to add number of hours"
                            />
                            <br/><p className='form-instruction' color='grey'><em>if you want a person for 3 hours only enter 0 for days and 3 for hours.</em></p>
                            <div className='error'>
                            <span ref='incorrectDays' ></span></div>
                            <div className='form-field'>Date: </div>  
                            <input
                            type="date"
                            ref="date"
                            /><br/> <p className='form-instruction'><em>Enter Starting date for more than one day</em></p><br/>
                            <div className='error'>
                            <span ref='incorrectDate'  ></span></div>

                            <div className='form-field'>Do you want to take the guide to another destination? If so enter the destination you will departure from: </div> 
                            <input
                            type="text"
                            ref="departure"
                            placeholder="Type to add departure location"
                            /><br/><br/>
                            <div className='form-field'>Any other information you want to tell the guide beforehand:</div> 
                            <input
                            type="text"
                            ref="additionalInformation"
                            placeholder="Type to add historic information about the desination"
                            /><br/><br/>
                            <button type="submit">Submit</button>
                        </form>
                    </center> : ''
                        }

                </div> 
                <div className='clear-end'></div>
            </div>
        )
    };
};
export default withTracker(() => {
    Meteor.subscribe('guideBookings');
    Meteor.subscribe('acceptedRequests');
    Meteor.subscribe('homeLinks');
    return {
        homeLink: HomeLinks.findOne({}),
        guideBookings: GuideBookings.find({owner:Meteor.userId()}, { sort: { createdAt: -1 } }).fetch(),
        acceptedRequests: AcceptedRequests.find({guide_id: { $ne: Meteor.userId() }}, { sort: { createdAt: 1 } }).fetch(),
        currentUser: Meteor.user(),
    };
  })(BookGuide);